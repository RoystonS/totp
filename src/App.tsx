import { TOTP } from 'otpauth';
import { useMemo, useState } from 'react';

import styles from './App.module.scss';
import { ConfigForm, IRawConfig } from './ConfigForm';
import { RenderCode } from './RenderCode';

function App() {
  const [error, setError] = useState('');
  const [secret, setSecret] = useState(getSecretFromUrl);
  const [algorithm, setAlgorithm] = useState(getAlgorithmFromUrl);
  const [period, setPeriod] = useState(getPeriodFromUrl);
  const [digits, setDigits] = useState(getDigitsFromUrl);

  function handleChange(config: IRawConfig) {
    setSecret(config.secret);
    setAlgorithm(config.algorithm);
    setPeriod(config.period);
    setDigits(config.digits);
  }

  const otp = useMemo(() => {
    try {
      const totp = new TOTP({
        secret,
        digits,
        period,
        algorithm,
      });
      setError('');
      return totp;
    } catch (err) {
      setError((err as any).toString());
      return undefined;
    }
  }, [secret, algorithm, period, digits]);

  const otpUrl = useMemo(() => {
    return otp?.toString();
  }, [otp]);

  // TODO: use reducer or store whole config
  const config: IRawConfig = {
    digits,
    period,
    secret,
    algorithm,
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
      {error ? <div className={styles.error}>{error}</div> : null}
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

function getAlgorithmFromUrl(): string {
  const url = new URL(window.location.href);
  const value = url.searchParams.get('algorithm') || 'SHA1';
  return value;
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
