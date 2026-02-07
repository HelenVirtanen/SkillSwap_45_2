import React from 'react';
import MainLayout from '../../app/layout/MainLayout/MainLayout';
import ErrorPageContent from '../../../src/widgets/ErrorPageContent/ErrorPageContent'; // ← ЭТОТ ПУТЬ!
import notFoundIcon from "../../assets/illustrations/error-404.svg";
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => (
  <MainLayout>
    <div className={styles.container}>
      <ErrorPageContent
        image={<img src={notFoundIcon} alt="404 Not Found" />}
        title="Страница не найдена"
        description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже."
      />
    </div>
  </MainLayout>
);

export default NotFoundPage;