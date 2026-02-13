import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import styles from './SearchInputUI.module.css';
import SearchIcon from '@assets/icons/search.svg?react';

interface SearchInputUIProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
  > {
  onChange?: (value: string) => void;
  onClear?: () => void;
}

const SearchInputUI: React.FunctionComponent<SearchInputUIProps> = ({
  placeholder = 'Искать навык',
  onChange,
  onClear,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleDebouncedChange = useMemo(
    () => _.debounce((value: string) => onChange?.(value), 500),
    [onChange],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    handleDebouncedChange(value);
  };

  const handleClear = () => {
    setInputValue('');
    handleDebouncedChange('');
    if (onClear) {
      onClear();
    }
  };

  useEffect(() => {
    return () => {
      handleDebouncedChange.cancel();
    };
  }, [handleDebouncedChange]);

  return (
    <div className={styles.searchInputContainer}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={styles.searchInput}
        {...inputProps}
      />
      {inputValue && (
        <button
          type="button"
          aria-label="Очистить"
          onClick={handleClear}
          className={styles.clearButton}
        ></button>
      )}
    </div>
  );
};

export default SearchInputUI;
