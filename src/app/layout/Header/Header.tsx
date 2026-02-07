import React from 'react';
import styles from './Header.module.css';
import Logo from '../../../features/Logo/Logo';
import ThemeToggle from '../../../widgets/ThemeToggle/ThemeToggle';
import SearchInputUI from '../../../shared/ui/SearchInputUI/SearchInputUI'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
        <Logo />
        <nav className={styles.nav}>
          <a href="/about">О проекте</a>
        </nav>
        <SearchInputUI/>
        <ThemeToggle isDark/>
    </header>
  );
};

export default Header;
