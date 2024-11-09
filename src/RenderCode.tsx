import clsx from 'clsx';
import type { TOTP } from 'otpauth';

import styles from './RenderCode.module.scss';
import { useGenerateCode, useTOTPPeriodInfo } from './useTOTPPeriodInfo';

export interface IRenderCodeProps {
  otp: TOTP;
}

export function RenderCode(props: IRenderCodeProps) {
  const { otp } = props;

  const { remainingTime, periodNumber } = useTOTPPeriodInfo(otp.period);
  const roundedRemainingTime = Math.round(remainingTime);

  // If we're less than 0.5 seconds from max, show max
  const lozengeTime =
    remainingTime > otp.period - 0.5 ? otp.period : remainingTime;

  const thisCode = useGenerateCode(otp, periodNumber);
  const nextCode = useGenerateCode(otp, periodNumber + 1);

  const switchOver = 5;

  const width = `${(100 * lozengeTime) / otp.period}%`;

  const switchingOver = remainingTime < switchOver;

  const largeChange = roundedRemainingTime == otp.period;

  return (
    <div
      className={clsx({
        [styles.switchingOver]: switchingOver,
        [styles.largeChange]: largeChange,
      })}
    >
      Remaining time: {roundedRemainingTime}
      <div className={styles.timerOuterLozenge}>
        <div
          className={styles.timerInnerLozenge}
          style={{ width: width }}
        ></div>
      </div>
      <div className={styles.codesContainer}>
        <div className={styles.thisCode}>{thisCode}</div>
        <div className={styles.nextCode}>{nextCode}</div>
      </div>
    </div>
  );
}
