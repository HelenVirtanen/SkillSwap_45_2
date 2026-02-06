import React from 'react';
import styles from './SearchInputUI.module.css';
import search from '../../../assets/icons/search.svg';

interface SearchInputUIProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputUI: React.FunctionComponent<SearchInputUIProps> = ({
  placeholder = 'Искать навык',
  onChange,
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
    </div>
  );
};

export default SearchInputUI;
