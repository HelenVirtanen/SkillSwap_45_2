import React from 'react';
import styles from './ButtonUI.module.css';

type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'social'
  | 'submit'
  | 'simple';

export interface IButtonProps {
  variant: TButtonVariant;
  title: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const ButtonUI: React.FC<IButtonProps> = ({
  variant,
  title,
  onClick,
  iconLeft,
  iconRight,
  disabled = false,
  type = 'button',
  className = '',
}) => (
  <button
    className={`${styles.button} ${styles[variant]} ${className}`} 
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
    {title}
    {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
  </button>
);

export default ButtonUI;