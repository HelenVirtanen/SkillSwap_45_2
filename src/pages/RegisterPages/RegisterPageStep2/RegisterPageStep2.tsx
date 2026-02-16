import Step2ProfileInfo, {
  Step2Data,
} from '@features/forms/RegisterSteps/Step2ProfileInfo/Step2ProfileInfo';
import Stepper from '@widgets/Stepper/Stepper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPageStep2.module.css';
import UserInfo from '@assets/illustrations/user-info.svg?react';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';

const RegisterPageStep2: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/register/step1');
  };

  const handleNext = () => {
    navigate('/register/step3');
  };

  const [formData, setFormData] = useState<Step2Data>({
    firstName: '',
    birthDate: '',
    gender: undefined,
    city: '',
    categorySkill: [],
    subcategorySkill: [],
  });

  const handleStep2Change = <K extends keyof Step2Data>(
    field: K,
    value: Step2Data[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(formData);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.stepper}>
      <Stepper currentStep={2} />
      </div>
      <div className={styles.mainWrapper}>
        <Step2ProfileInfo
          initialData={formData}
          onFieldChange={handleStep2Change}
          handleBack={handleBack}
          handleNext={handleNext}
        />

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
