import React, { useCallback } from 'react';
import styles from './ConfigForm.module.scss';

export interface IRawConfig {
  secret: string;
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
    [config, onChange]
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
    [config, onChange]
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
    [config, onChange]
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
