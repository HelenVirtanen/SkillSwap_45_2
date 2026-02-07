import React from 'react';
import styles from './ThemeToggle.module.css';
import MoonIcon from '../../assets/icons/moon.svg?react';
import SunIcon from '../../assets/icons/sun.svg?react';

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
      {isDark ? (
        <MoonIcon className={styles.themeToggleIcon} />
      ) : (
        <SunIcon className={styles.themeToggleIcon} />
      )}
    </button>
  );
};

export default ThemeToggle;