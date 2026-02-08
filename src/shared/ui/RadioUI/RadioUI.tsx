import React from 'react';
import styles from './RadioUI.module.css';

export interface RadioUIProps {
  children: React.ReactNode; //  содержимое радио кнопки
  name: string; //  группируем радио кнопки
  value: string; // значение которое вернётся при выборе этой кнопки
  checked: boolean; //  состояние  (выбрана / нет)
  onChange: (value: string) => void; //  функция которая вызывается при клике на кнопку
  className?: string; //  дополнительные стили если есть
}

const RadioUI: React.FC<RadioUIProps> = ({
  children,
  name,
  value,
  checked,
  onChange,
  className = '',
}) => {
  const handleChange = () => {
    onChange(value);
  };
  return(
    <label className={`${styles.radioContainer} ${className}`}>
      <input
      type='radio'
      name={name}
      value={value}
      checked={checked}
      onChange={handleChange}
      className={styles.radioInput}
      />
      <span className={styles.radioLabel}>{children}</span>
    </label>
  )
};


export default RadioUI;
