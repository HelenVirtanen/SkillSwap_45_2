import React from 'react';
import ErrorContent from '../../widgets/ErrorContent/ErrorContent';
import notFoundIcon from '../../assets/illustrations/error-404.svg';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => (
  <div className={styles.errorPage404}>
    <ErrorContent
      image={<img src={notFoundIcon} alt="404 Not Found" />}
      title="Страница не найдена"
      description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже."
    />
  </div>
);

export default NotFoundPage;
