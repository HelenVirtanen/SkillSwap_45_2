import { useNavigate } from 'react-router-dom';
import MainLayout from '../../app/layout/MainLayout/MainLayout';
import styles from './ServerErrorPage.module.css';
import error500 from '../../assets/illustrations/error-500.svg';
import ButtonUI from '../../shared/ui/ButtonUI';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className={styles.serverError}>
        <img
          src={error500}
          alt="500 error"
          className={styles.serverError__image}
        />
        <h2 className={styles.serverError__subtitle}>
          На сервере произошла ошибка
        </h2>
        <p className={styles.serverError__text}>
          Попробуйте позже или вернитесь на главную страницу
        </p>

        <div className={styles.serverError__actions}>
       
          <ButtonUI
            variant="secondary"
            title="Сообщить об ошибке"
          />
          <ButtonUI
            variant="primary"
            title="На главную"
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ServerErrorPage;
