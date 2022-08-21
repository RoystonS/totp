import clsx from 'clsx';
import type { TOTP } from 'otpauth';

import classes from './RenderCode.module.scss';
import { useGenerateCode, useTOTPPeriodInfo } from './useTOTPPeriodInfo';

export interface IRenderCodeProps {
  otp: TOTP;
}

export function RenderCode(props: IRenderCodeProps) {
  const { otp } = props;

  const { remainingTime, periodNumber } = useTOTPPeriodInfo(otp.period);

  const thisCode = useGenerateCode(otp, periodNumber);
  const nextCode = useGenerateCode(otp, periodNumber + 1);

  const switchOver = 5;

  const width = `${(100 * remainingTime) / otp.period}%`;

  const switchingOver = remainingTime < switchOver;

  return (
    <div className={switchingOver ? classes.switchingOver : ''}>
      Remaining time: {remainingTime}
      <div className={classes.timerOuterLozenge}>
        <div
          className={classes.timerInnerLozenge}
          style={{ width: width }}
        ></div>
        <div className={classes.codesContainer}>
          <div className={classes.thisCode}>{thisCode}</div>
          <div className={classes.nextCode}>{nextCode}</div>
        </div>
      </div>
    </div>
  );
}
