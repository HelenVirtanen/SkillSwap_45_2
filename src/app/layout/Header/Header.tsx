import React from 'react';
import styles from './Header.module.css';
import Logo from '../../../features/Logo/Logo';
import ThemeToggle from '../../../widgets/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
        <Logo />
        <nav className={styles.nav}>
          <a href="/about">О проекте</a>
        </nav>
        <ThemeToggle isDark/>
    </header>
  );
};

export default Header;
