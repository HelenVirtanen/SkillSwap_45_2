import ButtonUI from "@shared/ui/ButtonUI/ButtonUI";
import Stepper from "@widgets/Stepper/Stepper";
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

export default RegisterPageStep3;