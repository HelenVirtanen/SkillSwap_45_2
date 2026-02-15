import Step2ProfileInfo, { Step2Data } from "@shared/ui/RegisterSteps/Step2ProfileInfo/Step2ProfileInfo";
import { useState } from "react";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<Step2Data>({
    firstName: '',
    birthDate: '',
    gender: undefined,
    city: [],
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
    <>
      <h1>Страница регистрации</h1>
      <h2></h2>
      <Step2ProfileInfo 
        initialData={formData} 
        onFieldChange={handleStep2Change}
      />
    </>
  );
}

export default RegisterPage;