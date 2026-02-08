import React from 'react';
import styles from './Header.module.css';
import Logo from '../../../features/Logo/Logo';
import Link from '../../../features/navigation/Link/Link';
import ThemeToggle from '../../../widgets/ThemeToggle/ThemeToggle';
import SearchInputUI from '../../../shared/ui/SearchInputUI/SearchInputUI';
import ButtonUI from '../../../shared/ui/ButtonUI/ButtonUI';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <Link to="/" title="О проекте" />
      </nav>
      <SearchInputUI />
      <ThemeToggle isLight />
      <div className={styles.buttons}>
        <ButtonUI variant="secondary" title="Войти"></ButtonUI>
        <ButtonUI variant="primary" title="Зарегистрироваться"></ButtonUI>
      </div>
    </header>
  );
};

export default Header;
