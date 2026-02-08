import React from 'react';
import ErrorContent from '../../widgets/ErrorContent/ErrorContent';
import serverErrorIcon from '../../assets/illustrations/error-500.svg';
import styles from './ServerErrorPage.module.css';

const ServerErrorPage: React.FC = () => (
  <div className={styles.errorPage500}>
    <ErrorContent
      image={<img src={serverErrorIcon} alt="500 Server Error" />}
      title="На сервере произошла ошибка"
      description="Попробуйте позже или вернитесь на главную страницу"
    />
  </div>
);

export default ServerErrorPage;
