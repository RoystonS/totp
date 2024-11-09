import React, { useCallback } from 'react';
import styles from './ConfigForm.module.scss';

const supportedAlgorithms = [
  'SHA1',
  'SHA224',
  'SHA256',
  'SHA384',
  'SHA512',
  'SHA3-224',
  'SHA3-256',
  'SHA3-384',
  'SHA3-512',
];

export interface IRawConfig {
  secret: string;
  algorithm: string;
  period: number;
  digits: number;
}
export interface IConfigFormProps {
  config: IRawConfig;
  onChange(config: IRawConfig): void;
}

export function ConfigForm({ config, onChange }: IConfigFormProps) {
  const handleSecretChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      const url = new URL(window.location.href);
      const newSecret = e.target.value.trim().toUpperCase();
      url.hash = newSecret;
      window.history.replaceState(null, '', url.toString());
      onChange({
        ...config,
        secret: e.target.value,
      });
    },
    [config, onChange],
  );
  const handleAlgorithmChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(
    (e) => {
      const url = new URL(window.location.href);
      const newValue = e.target.value;
      url.searchParams.set('algorithm', newValue);
      window.history.replaceState(null, '', url.toString());
      onChange({
        ...config,
        algorithm: newValue,
      });
    },
    [config, onChange],
  );
  const handlePeriodChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set('period', e.target.value);
      window.history.replaceState(null, '', url.toString());
      onChange({
        ...config,
        period: parseInt(e.target.value, 10),
      });
    },
    [config, onChange],
  );
  const handleDigitsChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set('digits', e.target.value);
      window.history.replaceState(null, '', url.toString());
      onChange({
        ...config,
        digits: parseInt(e.target.value, 10),
      });
    },
    [config, onChange],
  );

  return (
    <div>
      <label>
        Key
        <br />
        <input
          className={styles.inputSecret}
          type="text"
          value={config.secret}
          onChange={handleSecretChange}
        />
      </label>
      <br />
      <label>
        Algorithm
        <br />
        <select value={config.algorithm} onChange={handleAlgorithmChange}>
          {supportedAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Period
        <br />
        <input
          type="number"
          value={config.period}
          onChange={handlePeriodChange}
          min={0}
          step={1}
        />
      </label>
      <br />
      <label>
        Digits
        <br />
        <input
          type="number"
          value={config.digits}
          onChange={handleDigitsChange}
          min={1}
          max={14}
          step={1}
        />
      </label>
    </div>
  );
}
