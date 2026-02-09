import React from 'react';
import styles from './HeaderMain.module.css';
import Logo from '@features/Logo/Logo';
import Link from '@features/navigation/Link/Link';
import ThemeToggle from '@widgets/ThemeToggle/ThemeToggle';
import SearchInputUI from '@shared/ui/SearchInputUI/SearchInputUI';
import SkillsDropdown from '@widgets/SkillDropDown/SkillDropdown';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';

const HeaderMain: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <Link to="/" title="О проекте" />
      </nav>
      <SkillsDropdown />
      <SearchInputUI />
      <ThemeToggle isLight />
      <div className={styles.buttons}>
        <ButtonUI variant="secondary" title="Войти"></ButtonUI>
        <ButtonUI variant="primary" title="Зарегистрироваться"></ButtonUI>
      </div>
    </header>
  );
};

export default HeaderMain;
