import React from 'react';
import styles from './ThemeToggle.module.css';
import moonIcon from '../../assets/icons/moon.svg';
import sunIcon from '../../assets/icons/sun.svg';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle?: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
}) => {
  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label="Сменить тему"
      onClick={onToggle}
    >
      <img
        src={isDark ? moonIcon : sunIcon}
        alt={isDark ? 'Тёмная тема' : 'Светлая тема'}
        className={styles.themeToggleIcon}
      />
    </button>
  );
};

export default ThemeToggle;