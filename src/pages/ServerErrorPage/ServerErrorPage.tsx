import ErrorContent from '../../widgets/ErrorContent/ErrorContent';
import ServerErrorImage from '../../assets/icons/server-error.svg?react';
import styles from './ServerErrorPage.module.css';

const ServerErrorPage = () => {
  return (
    <div className={styles.errorPage500}>
      <ErrorContent
        image={<ServerErrorImage />}
        title="Ошибка сервера"
        description="Попробуйте обновить страницу позже"
      />
    </div>
  );
};

export default ServerErrorPage;
