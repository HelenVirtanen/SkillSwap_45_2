import styles from './RegisterPageStep1.module.css';
import BulbIcon from '@assets/illustrations/light-bulb.svg?react';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';
import Stepper from '@widgets/Stepper/Stepper';
import Step1UserInfo from '@features/forms/RegisterSteps/Step1UserInfo/Step1UserInfo';

const RegisterPageStep1: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
        <Stepper currentStep={1} />
      </div>
      <div className={styles.content}>
        <Step1UserInfo />
        <IllustrationPanel
          image={<BulbIcon />}
          title="Добро пожаловать в SkillSwap!"
          description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
        />
      </div>
    </div>
  );
};

export default RegisterPageStep1;