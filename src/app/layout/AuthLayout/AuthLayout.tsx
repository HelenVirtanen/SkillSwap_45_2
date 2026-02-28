import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import HeaderAuth from '../Header/HeaderAuth';

const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderAuth />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
