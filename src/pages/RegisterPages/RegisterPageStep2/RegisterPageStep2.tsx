import ButtonUI from "@shared/ui/ButtonUI/ButtonUI";
import Stepper from "@widgets/Stepper/Stepper";
import { useNavigate } from "react-router-dom";

const RegisterPageStep2: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/register/step1');
  }

  const handleNext = () => {
    navigate('/register/step3')
  }

  return (
    <div>
      <Stepper currentStep={2}/>
      <div>
        <ButtonUI 
          variant="secondary"
          title="Назад"
          onClick={handleBack}
        />
        <ButtonUI 
          variant="primary"
          title="Продолжить"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default RegisterPageStep2;