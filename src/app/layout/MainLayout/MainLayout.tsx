import { type ReactNode } from 'react';
import styles from './MainLayout.module.css';
import Header from '../Header/Header';
import UserInfoUI from '../../../shared/ui/UserInfoUI/UserInfoUI';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div style={{width: '324px', padding: '20px', background: '#f0f0f0', margin: '20px 0' }}>
        <h3>Тестовый компонент:</h3>
        <UserInfoUI
          avatar="https://1avatara.ru/pic/men/man0016.jpg"
          name="Тестовый Пользователь"
          birthDate="1988-01-01"
          city="Тестовый Город"
          isFavorite={false}
        />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
