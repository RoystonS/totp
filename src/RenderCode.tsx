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

  const switchOver = 3;

  const width = `${(100 * remainingTime) / otp.period}%`;
  return (
    <div>
      Remaining: {periodNumber} {remainingTime}; code: {thisCode} -&gt;{' '}
      {nextCode}
      <div className={classes.timerOuterLozenge}>
        <div
          className={classes.timerInnerLozenge}
          style={{ width: width }}
        ></div>
        <div className={classes.codesContainer}>
          <div
            className={
              classes.thisCode +
              ' ' +
              (remainingTime < switchOver ? classes.slideOut : '')
            }
          >
            {thisCode}
          </div>
          <div
            className={
              classes.nextCode +
              ' ' +
              (remainingTime < switchOver ? classes.slideIn : '')
            }
          >
            {nextCode}
          </div>
        </div>
      </div>
    </div>
  );
}
