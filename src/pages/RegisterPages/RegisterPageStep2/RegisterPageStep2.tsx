import Step2ProfileInfo, { Step2Data } from "@features/forms/RegisterSteps/Step2ProfileInfo/Step2ProfileInfo";
import Stepper from "@widgets/Stepper/Stepper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPageStep2: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/register/step1');
  }

  const handleNext = () => {
    navigate('/register/step3')
  }


  const [formData, setFormData] = useState<Step2Data>({
    firstName: '',
    birthDate: '',
    gender: undefined,
    city: '',
    categorySkill: [],
    subcategorySkill: []    
  });

  const handleStep2Change = <K extends keyof Step2Data>(
    field: K, 
    value: Step2Data[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  console.log(formData)
  return (
    <div>
      <Stepper currentStep={2}/>
      <Step2ProfileInfo 
        initialData={formData} 
        onFieldChange={handleStep2Change}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
}

export default RegisterPageStep2;

