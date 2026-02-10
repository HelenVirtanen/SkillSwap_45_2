import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import HeaderMain from '../Header/HeaderMain';
import Footer from '../Footer/Footer';
import AutoCompleteUI from '../../../shared/ui/AutoCompleteUI/AutoCompleteUI'

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderMain />
      <AutoCompleteUI/>
      <main className={styles.main}><Outlet/></main>
      <Footer />
    </div>
  );
};

export default MainLayout;