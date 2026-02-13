import React, { useState } from 'react';
import _ from 'lodash';
import styles from './SearchInputUI.module.css';
import SearchIcon from '@assets/icons/search.svg?react';

interface SearchInputUIProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const SearchInputUI: React.FunctionComponent<SearchInputUIProps> = ({
  placeholder = 'Искать навык',
  onChange,
  onClear,
}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleDebouncedChange = _.debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleDebouncedChange(event);
  };

  const handleClear = () => {
    setInputValue('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={styles.searchInputContainer}>
      <SearchIcon className={styles.searchIcon}/>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={styles.searchInput}
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