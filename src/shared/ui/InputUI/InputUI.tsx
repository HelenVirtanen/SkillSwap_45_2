<<<<<<< HEAD
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
=======
import React, { useState, useRef } from 'react';
import styles from './InputUI.module.css';
import Eye from '../../../assets/icons/eye.svg?react';

interface InputUIProps {}

const InputUI: React.FC<InputUIProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordFieldRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
    if (passwordFieldRef.current) {
      passwordFieldRef.current.type = showPassword ? 'password' : 'text';
    }
  };

  return (
    <div className={styles['form']}>
      <div className={`${styles['input-container']} input-container`}>
        <label className={`${styles['label']} label`}>Email</label>
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles['input-field']} input-field`}
        />
      </div>
      <div className={`${styles['input-container']} input-container`}>
        <label className={`${styles['label']} label`}>Пароль</label>
        <div className={styles['password-input-wrapper']}>
          <input
            ref={passwordFieldRef}
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles['input-field']} input-field`}
          />
          <button
            className={styles['eye-button']}
            onClick={togglePasswordVisibility}
            aria-label="Показать/скрыть пароль"
          >
            <Eye className={styles.eye}/>            
          </button>
        </div>
      </div>
>>>>>>> 03b499183ac90c36207e2160f302eab52f2c9857
    </div>
  );
};

<<<<<<< HEAD
export default InputUI;
=======
export default InputUI;
>>>>>>> 03b499183ac90c36207e2160f302eab52f2c9857
