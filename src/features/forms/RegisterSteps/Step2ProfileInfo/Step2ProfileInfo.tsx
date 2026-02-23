import InputUI from '@shared/ui/InputUI/InputUI';
import styles from './Step2ProfileInfo.module.css';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';
import { useEffect, useState } from 'react';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import AutoCompleteUI from '@shared/ui/AutoCompleteUI/AutoCompleteUI';
import DatePicker from '@widgets/DatePicker/DatePicker';
import AvatarUI from '@shared/ui/AvatarUI/AvatarUI';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import {
  setStep2Data,
  setCurrentStep,
  selectRegistrationStep1,
  selectRegistrationStep2,
} from '@app/store/slices/registration/registrationSlice';
import { useNavigate } from 'react-router-dom';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice';
import React from 'react';

const optionsGenders = ['Не указан', 'Мужской', 'Женский'];

export type Step2Data = {
  firstName?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  categorySkill?: string[];
  subcategorySkill?: string[];
};

const Step2ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Защита от прямого перехода на шаг 2 без данных шага 1
  const step1Data = useAppSelector(selectRegistrationStep1);
  const storedStep2Data = useAppSelector(selectRegistrationStep2);

  const [localData, setLocalData] = useState<Step2Data>(() => ({
    firstName: storedStep2Data.firstName || '',
    birthDate: storedStep2Data.birthDate || '',
    gender: storedStep2Data.gender || 'Не указан',
    city: storedStep2Data.city || '',
    categorySkill: storedStep2Data.categorySkill || [],
    subcategorySkill: storedStep2Data.subcategorySkill || [],
  }));

  useEffect(() => {
    if (!step1Data.email || !step1Data.password) {
      console.warn('Данные шага 1 отсутствуют. Перенаправляем на шаг 1.');
      navigate('/register/step1', { replace: true });
    }
  }, [step1Data, navigate]);

  // Данные категорий из стора
  const categories = useAppSelector(selectCategories);

  const categoryOptions = React.useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      label: c.title,
      value: c.title,
    }));
  }, [categories]);

  const handleFieldChange = <K extends keyof Step2Data>(
    field: K,
    value: Step2Data[K],
  ) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  // Опции подкатегорий на основе выбранных категорий
  const subcategoryOptions = React.useMemo(() => {
    if (!localData.categorySkill?.length) return [];
    return categories
      .filter((category) => localData.categorySkill?.includes(category.title))
      .flatMap((category) =>
        category.subcategories.map((sub) => ({
          id: sub.id,
          label: sub.title,
          value: sub.title,
        }))
      );
  }, [categories, localData.categorySkill]);

  // Синхронизация подкатегорий: очищаем или обрезаем некорректные
  useEffect(() => {
    if (!localData.categorySkill?.length) {
      handleFieldChange('subcategorySkill', []);
      return;
    }
    const validSubcategories = localData.subcategorySkill?.filter((sub) =>
      subcategoryOptions.some((opt) => opt.value === sub)
    ) || [];
    if (validSubcategories.length !== localData.subcategorySkill?.length) {
      handleFieldChange('subcategorySkill', validSubcategories);
    }
  }, [localData.categorySkill, subcategoryOptions]);

  const isSubcategoryDisabled = !localData.categorySkill?.length;

  const handleBackClick = () => {
    dispatch(setStep2Data(localData));
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
          onChange={(e) => handleFieldChange('firstName', e.target.value)}
          placeholder="Введите ваше имя"
        />
      </div>

      <div className={styles.inLineDataAndGender}>
        <div className={styles.dataPicker}>
          <DatePicker
            title="Дата рождения"
            placeholder="дд.мм.гггг"
            selected={localData.birthDate ? new Date(localData.birthDate) : null}
            onChange={(date) => {
              handleFieldChange(
                'birthDate',
                date ? date.toISOString().split('T')[0] : ''
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
          key={`category-${localData.categorySkill?.join(',')}`}
          placeholder="Выберите категорию"
          label="Категория навыка, которому хотите научиться"
          options={categoryOptions}
          selected={localData.categorySkill || []}
          onChange={(value: string[]) => handleFieldChange('categorySkill', value)}
        />

        <MultiSelectDropdownUI
          key={`subcategory-${localData.subcategorySkill?.join(',') || 'empty'}`}
          placeholder="Выберите подкатегорию"
          label="Подкатегория навыка, которому хотите научиться"
          options={subcategoryOptions}
          selected={localData.subcategorySkill || []}
          onChange={(value: string[]) => handleFieldChange('subcategorySkill', value)}
          disabled={isSubcategoryDisabled}
        />
      </div>

      <div className={styles.inLineButtons}>
        <ButtonUI variant="secondary" title="Назад" onClick={handleBackClick} />
        <ButtonUI variant="primary" title="Продолжить" onClick={handleNextClick} />
      </div>
    </div>
  );
};

export default Step2ProfileInfo;