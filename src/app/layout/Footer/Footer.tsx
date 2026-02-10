import React from 'react';
import styles from './Footer.module.css';
import Logo from '@features/Logo/Logo';
import Link from '@features/navigation/Link/Link';

const footerLinks = [
  {
    label: 'О проекте',
    route: '/about',
    id: 'about',
  },
  {
    label: 'Все навыки',
    route: '/',
    //  Роуты надо доработать при их реализации
    id: 'skills',
  },
  {
    label: 'Контакты',
    route: '/',
    id: 'contacts',
  },
  {
    label: 'Блог',
    route: '/',
    id: 'Blog',
  },
  {
    label: 'Политика конфиденциальности',
    route: '/',
    id: 'policy',
  },
  {
    label: 'Пользовательское соглашение',
    route: '/',
    id: 'agreement',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <nav className={styles.nav}>
        <ul className={styles.grid}>
          {footerLinks.map((link) => (
            <li key={link.id}>
              <Link title={link.label} to={link.route} />
            </li>
          ))}
        </ul>
      </nav>
      <p className={styles.footer__copyright}>SkillSwap — 2025</p>
    </footer>
  );
};

export default Footer;
