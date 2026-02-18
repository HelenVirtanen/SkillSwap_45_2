import InputUI from '@shared/ui/InputUI/InputUI';
import styles from './Step2ProfileInfo.module.css';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';
import { useState, useEffect } from 'react';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import AutoCompleteUI from '@shared/ui/AutoCompleteUI/AutoCompleteUI';
import DatePicker from '@widgets/DatePicker/DatePicker';
import AvatarUI from '@shared/ui/AvatarUI/AvatarUI';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import {
  setStep2Data,
  setCurrentStep,
  selectRegistrationStep1,
} from '@app/store/slices/registration/registrationSlice';
import { useNavigate } from 'react-router-dom';

//
//
//3) Добавить datapicker потом
//4) Убрать фейковые данные
//5) Подправить как для навыков DropDown
//6) Связать категории подкатегории (аля функция и на входи название приходит(категории или подкатегории)
// и значит пересчитываем выдаваемые значения для второго списка
//7) Сделать input для городов на основе моего DropDown
//8)
//9) Ещё надо сделать label + input скорее всего но я хз
const optionsGenders = ['Не указан', 'Мужской', 'Женский']; //Для пола
const optionsCategorySkillsWantedToLearn = [
  {
    id: 1,
    label: 'Бизнес и карьера',
    value: 'бизнес и карьера',
  },
  {
    id: 2,
    label: 'Творчество и искусство',
    value: 'творчество и искусство',
  },
  {
    id: 3,
    label: 'Иностранные языки',
    value: 'иностранные языки',
  },
  {
    id: 4,
    label: 'Здоровье и лайфстайл',
    value: 'здоровье и лайфстайл',
  },
  {
    id: 5,
    label: 'Дом и уют',
    value: 'дом и уют',
  },
];
const optionsSubCategorySkillsWantedToLearn = [
  {
    id: 1,
    label: 'Рисование и иллюстрация',
    value: 'Рисование и иллюстрация',
  },
  {
    id: 2,
    label: 'Фотография',
    value: 'Фотография',
  },
  {
    id: 3,
    label: 'Видеомонтаж',
    value: 'Видеомонтаж',
  },
  {
    id: 4,
    label: 'Музыка и звук',
    value: 'Музыка и звук',
  },
  {
    id: 5,
    label: 'Актёрское мастерство',
    value: 'Актёрское мастерство',
  },
  {
    id: 6,
    label: 'Креативное письмо',
    value: 'Креативное письмо',
  },
  {
    id: 7,
    label: 'Арт-терапия',
    value: 'Арт-терапия',
  },
  {
    id: 8,
    label: 'Декор и DIY',
    value: 'Декор и DIY',
  },
];

export type Step2Data = {
  firstName?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  categorySkill?: string[];
  subcategorySkill?: string[];
};

const Step2ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const step1Data = useAppSelector(selectRegistrationStep1); // берм данные шага 1

  // Защита от прямого перехода на шаг 2 без данных шага 1
  useEffect(() => {
    if (!step1Data.email || !step1Data.password) {
      console.warn('Данные шага 1 отсутствуют. Перенаправляем на шаг 1.');
      navigate('/register/step1', { replace: true });
    }
  }, [step1Data, navigate]);

  const [localData, setLocalData] = useState<Step2Data>(() => ({
    firstName: '',
    birthDate: '',
    gender: 'Не указан',
    city: '',
    categorySkill: [],
    subcategorySkill: [],
  }));

  const handleFieldChange = <K extends keyof Step2Data>(
    field: K,
    value: Step2Data[K],
  ) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };
  const handleBackClick = () => {
    navigate('/register/step1');
  };

  const handleNextClick = () => {
    if (!localData.firstName?.trim()) {
    alert('Пожалуйста, введите имя');
    return;
  }
  if (!localData.city?.trim()) {
    alert('Пожалуйста, выберите город');
    return;
  }
    dispatch(setStep2Data(localData));
    dispatch(setCurrentStep(3));
    navigate('/register/step3');
  };

  return (
    <div className={styles.form}>
      <div className={styles.avatarWrapper}>
        <AvatarUI className="avatar" />
      </div>
      <div className={styles.nameInput}>
        <InputUI
          value={localData.firstName}
          label={'Имя'}
          onChange={(e) => {
            handleFieldChange('firstName', e.target.value);
          }}
          placeholder="Введите ваше имя"
        />
      </div>

      <div className={styles.inLineDataAndGender}>
        <div className={styles.dataPicker}>
          <DatePicker
            title="Дата рождения"
            placeholder="дд.мм.гггг"
            selected={
              localData.birthDate ? new Date(localData.birthDate) : null
            }
            onChange={(date) => {
              handleFieldChange(
                'birthDate',
                date ? date.toISOString().split('T')[0] : '',
              );
            }}
          />
        </div>
        <div className={styles.dropDownUI}>
          <DropDownUI
            title="Пол"
            options={optionsGenders}
            value={localData.gender}
            onChange={(value) => handleFieldChange('gender', value)}
          />
        </div>
      </div>
      <div className={styles.autoCompleteUI}>
        <AutoCompleteUI
          onCitySelect={(value) => handleFieldChange('city', value)}
        />
      </div>
      <div className={styles.multiSelectDropdownUI}>
        <MultiSelectDropdownUI
          placeholder="Выберите категорию"
          label="Категория навыка, которому хотите научиться"
          options={optionsCategorySkillsWantedToLearn}
          selected={localData.categorySkill ? localData.categorySkill : []}
          onChange={(value: string[]) => {
            handleFieldChange('categorySkill', value);
          }}
        />

        <MultiSelectDropdownUI
          placeholder="Выберите подкатегорию"
          label="Подкатегория навыка, которому хотите научиться"
          options={optionsSubCategorySkillsWantedToLearn}
          selected={
            localData.subcategorySkill ? localData.subcategorySkill : []
          }
          onChange={(value: string[]) => {
            handleFieldChange('subcategorySkill', value);
          }}
        />
      </div>

      <div className={styles.inLineButtons}>
        <ButtonUI variant="secondary" title="Назад" onClick={handleBackClick} />
        <ButtonUI
          variant="primary"
          title="Продолжить"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};
export default Step2ProfileInfo;
