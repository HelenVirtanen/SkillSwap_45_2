import React from 'react';
import Stepper from '@widgets/Stepper/Stepper';
import { Step3SkillInfo } from '@features/forms/RegisterSteps/Step3SkillInfo/Step3SkillInfo';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';

import SkillImage from '@assets/illustrations/school-board.svg?react';

import styles from './RegisterPageStep3.module.css';

const RegisterPageStep3: React.FC = () => {
  return (
    <div className={styles.page}>
      <Stepper currentStep={3} />

      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Step3SkillInfo/>
        </div>

        <div className={styles.right}>
          <IllustrationPanel
            image={<SkillImage />}
            title="Укажите, чем вы готовы поделиться"
            description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
          />
        </div>
      </div>

    </div>
  );
};

export default RegisterPageStep3;
