import { type ReactNode } from 'react';
import styles from './MainLayout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
