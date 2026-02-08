import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import Header from '../Header/Header';

const AuthLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}><Outlet/></main>
    </div>
  );
};

export default AuthLayout;
