import Step2ProfileInfo from '@features/forms/RegisterSteps/Step2ProfileInfo/Step2ProfileInfo';
import Stepper from '@widgets/Stepper/Stepper';
import styles from './RegisterPageStep2.module.css';
import UserInfo from '@assets/illustrations/user-info.svg?react';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';

const RegisterPageStep2: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.stepper}>
        <Stepper currentStep={2} />
      </div>
      <div className={styles.mainWrapper}>
        <Step2ProfileInfo />

        <div>
          <IllustrationPanel
            image={<UserInfo />}
            title="Расскажите немного о себе"
            description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPageStep2;
