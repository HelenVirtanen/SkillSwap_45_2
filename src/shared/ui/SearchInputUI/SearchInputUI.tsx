import React from 'react';
import styles from './SearchInputUI.module.css';
<<<<<<< HEAD
=======
import search from '../../../assets/icons/search.svg';
>>>>>>> d60a549757bdb729e3e240dcf0062c15c293963a

interface SearchInputUIProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
<<<<<<< HEAD
  onClear?: () => void;
=======
>>>>>>> d60a549757bdb729e3e240dcf0062c15c293963a
}

const SearchInputUI: React.FunctionComponent<SearchInputUIProps> = ({
  placeholder = 'Искать навык',
  onChange,
<<<<<<< HEAD
  onClear,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={styles.searchInputContainer}>
      <span className={styles.searchIcon}></span>
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
=======
}) => {
  return (
    <div className={styles.searchInputContainer}>
      <img src={search} alt="search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={styles.searchInput}
      />
>>>>>>> d60a549757bdb729e3e240dcf0062c15c293963a
    </div>
  );
};

<<<<<<< HEAD
export default SearchInputUI;
=======
export default SearchInputUI;
>>>>>>> d60a549757bdb729e3e240dcf0062c15c293963a
