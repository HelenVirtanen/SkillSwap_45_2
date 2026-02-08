import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import HeaderMain from '../Header/HeaderMain';

const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderMain />
      <main className={styles.main}><Outlet/></main>
    </div>
  );
};

export default AuthLayout;
