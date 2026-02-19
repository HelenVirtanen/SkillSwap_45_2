import Step2ProfileInfo, {
  Step2Data,
} from '@features/forms/RegisterSteps/Step2ProfileInfo/Step2ProfileInfo';
import Stepper from '@widgets/Stepper/Stepper';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './RegisterPageStep2.module.css';
import UserInfo from '@assets/illustrations/user-info.svg?react';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';

const RegisterPageStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Получаем данные из state шага 1
  const { email, password, returnTo, proposeExchange, targetUserId } = location.state || {};

  // Если нет email - возвращаем на шаг 1
  useEffect(() => {
    if (!email) {
      navigate('/register/step1');
    }
  }, [email, navigate]);

  const handleBack = () => {
    navigate('/register/step1', { 
      state: { returnTo, proposeExchange, targetUserId } 
    });
  };

  const handleNext = () => {
    // Передаем данные на шаг 3
    navigate('/register/step3', { 
      state: { 
        ...formData,
        email,
        password,
        returnTo,
        proposeExchange,
        targetUserId 
      } 
    });
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