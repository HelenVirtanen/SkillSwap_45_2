import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { FC } from 'react';
import styles from './MultiSelectDropdownUI.module.css';
import { CheckboxUI } from '@shared/ui/CheckboxUI/CheckboxUI';

interface Option {
  // один элемент списка
  id: string | number;
  label: string; // текст который будет видно
  value: string; // тут значение которое сохраняется
}

interface MultiSelectDropdownUIProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export const MultiSelectDropdownUI: FC<MultiSelectDropdownUIProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Выберите варианты',
  label,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // тут мы удаляем или добавляем значения ( управление множественным выбором)
  const handleOptionChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  // закрываем дроп даун при клике вне компонента
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  // текст который показывается в кнопке дропдауна (выберите варианты/выбранный элемент / или число элементов)
  const getDisplayText = useMemo(() => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      const selectedOption = options.find((opt) => opt.value === selected[0]);
      return selectedOption?.label || placeholder;
    }
    return `Выбрано: ${selected.length}`;
  }, [selected, options, placeholder]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.wrapper} ${isOpen ? styles.wrapperOpen : ''}`}>
        <button
          type="button"
          className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''} ${
            error ? styles.dropdownError : ''
          } ${disabled ? styles.dropdownDisabled : ''}`}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          disabled={disabled}
          aria-haspopup="listbox"
        >
          <span className={styles.dropdownText}>{getDisplayText}</span>
          <span className={styles.dropdownArrow}>⌵</span>
        </button>

        {isOpen && !disabled && (
          <div className={styles.dropdownMenu}>
            {options.map((option) => (
              <div
                key={option.id}
                className={styles.dropdownItem}
                onClick={(e) => e.stopPropagation()}
              >
                <CheckboxUI
                  label={option.label}
                  state={selected.includes(option.value) ? 'done' : 'default'}
                  onChange={() => handleOptionChange(option.value)}
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
