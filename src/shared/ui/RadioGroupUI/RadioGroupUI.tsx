import React from 'react';
import RadioUI from '../RadioUI/RadioUI';
import styles from './RadioGroupUI.module.css';

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupUIProps {
  options: RadioOption[]; // Массив опций с label и value
  name: string; // Имя группы (для HTML-атрибута name)
  value: string; // Текущее выбранное значение
  onChange: (value: string) => void; // Обработчик изменения
  label?: string; // Заголовок группы (опционально)
  className?: string; // Дополнительный класс для обёртки
}

const RadioGroupUI: React.FC<RadioGroupUIProps> = ({
  options,
  name,
  value,
  onChange,
  label,
  className = '',
}) => {
  return (
    <div className={`${styles.radioGroup} ${className}`}>
      {label && <h3 className={styles.radioGroupLabel}>{label}</h3>}

      {options.map((option) => (
        <RadioUI
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        >
          {option.label}
        </RadioUI>
      ))}
    </div>
  );
};

export default RadioGroupUI;
