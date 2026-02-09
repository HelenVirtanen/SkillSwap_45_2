import React, { useId, useState } from 'react';
import clsx from 'clsx';
import Eye from '../../../assets/icons/eye.svg?react';
import styles from './InputUI.module.css';

export interface InputUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  helperText?: string;
  rightAddon?: React.ReactNode;
  rows?: number;
  className?: string;
}

const InputUI: React.FC<InputUIProps> = ({
  label,
  value,
  onChange,
  onClick,
  error,
  helperText,
  rightAddon,
  type,
  placeholder,
  name,
  disabled,
  autoComplete,
  onBlur,
  onFocus,
  onKeyDown,
  className,
  rows = 3,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const inputType = isPassword && showPassword ? 'text' : type;

  const showError = typeof error === 'string' ? error : error === true;
  const showHelper = !error && helperText;

  const id = useId();

  return (
    <div className={clsx(styles.wrapper, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div
        className={clsx(styles.inputWrapper, {
          [styles.error]: showError,
        })}
      >
        {isTextarea ? (
          <textarea
            id={id}
            className={clsx(styles.input, styles.textarea)}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            autoComplete={autoComplete}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e as any)}
          />
        ) : (
          <input
            id={id}
            className={styles.input}
            type={inputType}
            value={value}
            onChange={onChange}
            onClick={onClick}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            autoComplete={autoComplete}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
          />
        )}

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.eyeButton}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <Eye className={styles.eyeIcon}/>
          </button>
        ) : (
          rightAddon && <div className={styles.rightAddon}>{rightAddon}</div>
        )}
      </div>

      {(showError && typeof error === 'string' && (
        <div className={styles.errorText}>{error}</div>
      )) || <div className={styles.errorDummy} />}

      {showHelper && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default InputUI;
