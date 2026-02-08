import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import MainHeader from '../Header/MainHeader';

const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <MainHeader />
      <main className={styles.main}><Outlet/></main>
    </div>
  );
};

export default AuthLayout;
