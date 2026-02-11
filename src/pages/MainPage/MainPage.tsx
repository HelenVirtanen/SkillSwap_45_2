import RadioGroupUI from '@shared/ui/RadioGroupUI/RadioGroupUI';
import Step1UserInfo from '@widgets/Forms/RegisterSteps/Step1UserInfo/Step1UserInfo';
import { useState } from 'react';

const MainPage: React.FC = () => {
  const [selected, setSelected] = useState('any');

  const genderOptions = [
    { label: 'Не имеет значения', value: 'any' },
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
  ];

  return (
    <>
      <RadioGroupUI
        label="Пол автора"
        name="gender"
        options={genderOptions}
        value={selected}
        onChange={setSelected}
      />
      <Step1UserInfo />
    </>
  );
};

export default MainPage;
