import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import MainHeader from '../Header/MainHeader';
import Footer from '../Footer/Footer';

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <MainHeader />
      <main className={styles.main}><Outlet/></main>
      <Footer />
    </div>
  );
};

export default MainLayout;
