import React, { useId, useState, useRef } from 'react';
import Eye from '@assets/icons/eye.svg?react';
import Edit from '@assets/icons/edit-text.svg?react';
import styles from './InputUI.module.css';

export interface InputUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | boolean;
  helperText?: string;
  rightAddon?: React.ReactNode;
  rows?: number;
  className?: string;
  editIcon?: boolean;
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
  editIcon = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const inputType = isPassword && showPassword ? 'text' : type;

  const showError = typeof error === 'string' ? error : error === true;
  const showHelper = !error && helperText;

  const id = useId();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e as any);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e as any);
  };

  const handleEditClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const showEditIcon = editIcon && !isPassword && value && value.trim() !== '' && !isFocused;

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div
        className={`${styles.inputWrapper} ${showError ? styles.error : ''}`}
      >
        {isTextarea ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={id}
            className={`${styles.input} ${styles.textarea}`}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            autoComplete={autoComplete}
            rows={rows}
            value={value}
            onChange={onChange ? (e) => onChange(e) : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={id}
            className={styles.input}
            type={inputType}
            value={value}
            onChange={onChange ? (e) => onChange(e) : undefined}
            onClick={onClick}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            autoComplete={autoComplete}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            <Eye className={styles.eyeIcon} />
          </button>
        ) : (
          <>
            {showEditIcon && (
              <button
                type="button"
                onClick={handleEditClick}
                className={styles.editButton}
              >
                <Edit className={styles.editIcon} />
              </button>
            )}
            {!showEditIcon && rightAddon && <div className={styles.rightAddon}>{rightAddon}</div>}
          </>
        )}
      </div>

      {showError && typeof error === 'string' && (
        <div className={styles.errorText}>{error}</div>
      )}

      {showHelper && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default InputUI;