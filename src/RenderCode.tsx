import type { TOTP } from 'otpauth';

import styles from './RenderCode.module.scss';
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
    <div className={switchingOver ? styles.switchingOver : ''}>
      Remaining time: {remainingTime}
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
