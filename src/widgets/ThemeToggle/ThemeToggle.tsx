import React from 'react';
import styles from './ThemeToggle.module.css';
import moonIcon from '../../assets/icons/moon.svg';

const ThemeToggle: React.FC = () => {
  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label="Сменить тему"
    >
      <img
        src={moonIcon}
        alt="theme"
        className={styles.themeToggleIcon}
      />
    </button>
  );
};

export default ThemeToggle;
