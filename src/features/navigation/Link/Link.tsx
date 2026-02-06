import { NavLink } from 'react-router-dom';
import styles from './Link.module.css';

interface LinkProps {
  title: string;
  to?: string;  // это наша ссылочка 
}

const Link = ({ title, to = '/' }: LinkProps) => {
  return (
    <NavLink to={to} className={styles.link}>
      {title}
    </NavLink>
  );
};

export default Link;