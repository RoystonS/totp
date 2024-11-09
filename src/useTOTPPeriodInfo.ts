import type { TOTP } from 'otpauth';
import { useEffect, useMemo, useState } from 'react';

export function useTOTPPeriodInfo(period: number) {
  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(period),
  );
  const [periodNumber, setPeriodNumber] = useState(() =>
    getPeriodNumber(period),
  );

  useEffect(() => {
    const handle = setInterval(() => {
      const newPeriodNumber = getPeriodNumber(period);
      const remainingTime = getRemainingTime(period);
      setPeriodNumber(newPeriodNumber);
      setRemainingTime(remainingTime);
    }, 500);

    return () => {
      clearInterval(handle);
    };
  }, [period]);

  return { remainingTime, periodNumber };
}

export function useGenerateCode(otp: TOTP, periodNumber: number) {
  return useMemo(() => {
    const timestamp = periodNumber * otp.period * 1000;
    return otp.generate({ timestamp });
  }, [otp, periodNumber]);
}

function getPeriodNumber(period: number) {
  const now = Date.now();
  return Math.floor(now / (period * 1000));
}

function getRemainingTime(period: number) {
  const newPeriodNumber = getPeriodNumber(period);
  const remainingTime =
    ((newPeriodNumber + 1) * period * 1000 - Date.now()) / 1000;
  return remainingTime;
}
