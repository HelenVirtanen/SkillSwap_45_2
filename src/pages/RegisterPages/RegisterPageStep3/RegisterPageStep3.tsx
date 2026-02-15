import Stepper from "@widgets/Stepper/Stepper";
import { Step3SkillInfo } from "@features/forms/RegisterSteps/Step3SkillInfo/Step3SkillInfo";
import { useNavigate } from "react-router-dom";

const RegisterPageStep3: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/register/step2');
  }

  const handleNext = () => {
    navigate('/')
  }

  return (
    <div>
      <Stepper currentStep={3}/>
      <Step3SkillInfo onBack={handleBack} onNext={handleNext}/>
    </div>
  );
}

export default RegisterPageStep3;