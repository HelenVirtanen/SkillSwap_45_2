import InputUI from '@shared/ui/InputUI/InputUI';
import styles from './Step2ProfileInfo.module.css';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';
import { useEffect, useState } from 'react';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import AutoCompleteUI from '@shared/ui/AutoCompleteUI/AutoCompleteUI';
import DatePicker from '@widgets/DatePicker/DatePicker';
import AvatarUI from '@shared/ui/AvatarUI/AvatarUI';

import { useAppSelector } from '@app/store/store';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice'
import React from 'react';

const optionsGenders = ['Не указан', 'Мужской', 'Женский']; //Для пола


export type Step2Data = {
  firstName?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  categorySkill?: string[];
  subcategorySkill?: string[];
};

type Step2ProfileInfoProps = {
  initialData?: Step2Data;
  onChangeOfWantedSkills?: () => void;
  onFieldChange: <K extends keyof Step2Data>(
    field: K,
    value: Step2Data[K],
  ) => void;
  handleBack: () => void;
  handleNext: () => void;
};

const Step2ProfileInfo = (props: Step2ProfileInfoProps) => {
  
  

  const categories = useAppSelector(selectCategories)

  const categoryOptions = React.useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      label: c.title,
      value: c.title,
    }));
  }, [categories]);

  const { initialData, onFieldChange, handleBack, handleNext } = props;

  const [localData, setLocalData] = useState<Step2Data>(() => ({
    firstName: initialData?.firstName || '',
    birthDate: initialData?.birthDate || '',
    gender: initialData?.gender,
    city: initialData?.city || '',
    categorySkill: initialData?.categorySkill || [],
    subcategorySkill: initialData?.subcategorySkill || [],
  }));

  
  const handleFieldChange = <K extends keyof Step2Data>(
    field: K,
    value: Step2Data[K],
  ) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
    onFieldChange(field, value);
  };

 
  const subcategoryOptions = React.useMemo(() => {
    if (!localData.categorySkill?.length) return [];
  
    return categories
      .filter((category) =>
        localData.categorySkill?.includes(category.title)
      )
      .flatMap((category) =>
        category.subcategories.map((sub) => ({
          id: sub.id,
          label: sub.title,
          value: sub.title,
        }))
      );
  }, [categories, localData.categorySkill]);


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
          options={categoryOptions}
          selected={localData.categorySkill ? localData.categorySkill : []}
          onChange={(value: string[]) => {
            handleFieldChange('categorySkill', value);
          }}
        />

        <MultiSelectDropdownUI
          placeholder="Выберите подкатегорию"
          label="Подкатегория навыка, которому хотите научиться"
          options={subcategoryOptions}
          selected={
            localData.subcategorySkill ? localData.subcategorySkill : []
          }
          onChange={(value: string[]) => {
            handleFieldChange('subcategorySkill', value);
          }}
          disabled={isSubcategoryDisabled}
        />
      </div>

      <div className={styles.inLineButtons}>
        <ButtonUI variant="secondary" title="Назад" onClick={handleBack} />
        <ButtonUI variant="primary" title="Продолжить" onClick={handleNext} />
      </div>
    </div>
  );
};
export default Step2ProfileInfo;
