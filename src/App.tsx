import { TOTP } from 'otpauth';
import { useMemo, useState } from 'react';

import styles from './App.module.scss';
import { ConfigForm, IRawConfig } from './ConfigForm';
import { RenderCode } from './RenderCode';

function App() {
  const [secret, setSecret] = useState(getSecretFromUrl);
  const [period, setPeriod] = useState(getPeriodFromUrl);
  const [digits, setDigits] = useState(getDigitsFromUrl);

  function handleChange(config: IRawConfig) {
    setSecret(config.secret);
    setPeriod(config.period);
    setDigits(config.digits);
  }

  const otp = useMemo(() => {
    return new TOTP({
      secret,
      digits,
      period,
    });
  }, [secret, period, digits]);

  const otpUrl = useMemo(() => {
    return otp.toString();
  }, [otp]);

  // TODO: use reducer or store whole config
  const config: IRawConfig = {
    digits,
    period,
    secret,
  };

  return (
    <div className={styles.main}>
      <h1>One-Time-Password Generator</h1>
      <p>
        Note: all of the processing takes place entirely in your browser. No
        secrets are sent to any server.
      </p>
      <ConfigForm config={config} onChange={handleChange} />
      <br />
      {otp ? <RenderCode otp={otp} /> : null}
      <br />
      <div className={styles.otpurl}>{otpUrl}</div>
    </div>
  );
}

export default App;

function getSecretFromUrl(): string {
  const url = new URL(window.location.href);
  const secret = url.hash.substring(1) || 'SECRET';
  return secret;
}

function getPeriodFromUrl(): number {
  const url = new URL(window.location.href);
  const period = parseInt(url.searchParams.get('period') || '30');
  return period;
}

function getDigitsFromUrl(): number {
  const url = new URL(window.location.href);
  const digits = parseInt(url.searchParams.get('digits') || '6');
  return digits;
}
