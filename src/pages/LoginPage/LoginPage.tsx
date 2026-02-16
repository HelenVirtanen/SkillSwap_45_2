import styles from '@pages/LoginPage/LoginPage.module.css';
import BulbIcon from '@assets/illustrations/light-bulb.svg?react';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';
import LoginForm from '@features/forms/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.loginWrapper}>
      <h3 className={styles.login}>Вход</h3>
      </div>
      <div className={styles.containerWrapper}>
        <div className={styles.loginForm}>
          <LoginForm />
        </div>
        <div className={styles.illustrationPanel}>
          <IllustrationPanel
            image={<BulbIcon />}
            title="С возвращением в SkillSwap!"
            description="Обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
