import React, { useEffect, useState } from 'react';
import { useForm, Controller, useWatch, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import InputUI from '@shared/ui/InputUI/InputUI';
import styles from './Step3SkillInfo.module.css';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { registerUser } from '@app/store/slices/authUser/auth';
import { clearRegistration } from '@app/store/slices/registration/registrationSlice';
import { useNavigate } from 'react-router-dom';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';

// Тип данных формы (без image)
export interface Step3Data {
  title: string;
  category: string[];
  subcategory: string[];
  description: string;
}

// Схема валидации Yup (без image)
const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Название должно содержать от 3 до 50 символов')
    .max(50, 'Название должно содержать от 3 до 50 символов')
    .required('Обязательное поле'),
  category: yup
    .array(yup.string().required())
    .min(1, 'Выберите хотя бы одну категорию')
    .required('Выберите категорию'),
  subcategory: yup
    .array(yup.string().required())
    .min(1, 'Выберите хотя бы одну подкатегорию')
    .required('Выберите подкатегорию'),
  description: yup
    .string()
    .max(500, 'Описание не должно превышать 500 символов')
    .required('Обязательное поле'),
});

interface Step3SkillInfoProps {
  initialData?: Partial<Step3Data>;
}

export const Step3SkillInfo: React.FC<Step3SkillInfoProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const step1Data = useAppSelector((state) => state.registration.step1);
  const step2Data = useAppSelector((state) => state.registration.step2);

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (isRegistered) return;

    if (!step1Data.email || !step1Data.password) {
      console.warn('Данные регистрации отсутствуют. Перенаправляем на шаг 1.');
      navigate('/register/step1', { replace: true });
    }
  }, [step1Data, navigate, isRegistered]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<Step3Data>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || [],
      subcategory: initialData?.subcategory || [],
      description: initialData?.description || '',
    },
  });

  const selectedCategory = useWatch({ control, name: 'category' });
  const selectedSubcategory = useWatch({ control, name: 'subcategory' });

  const subcategoryOptions = React.useMemo(() => {
    if (!selectedCategory?.length) return [];

    return categories
      .filter((category) => selectedCategory.includes(category.title))
      .flatMap((category) => category.subcategories.map((sub) => sub.title));
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (!selectedCategory?.length && selectedSubcategory?.length) {
      setValue('subcategory', []);
      return;
    }

    const validSubcategories = selectedSubcategory?.filter((sub) =>
      subcategoryOptions.includes(sub)
    ) || [];

    if (JSON.stringify(selectedSubcategory || []) !== JSON.stringify(validSubcategories)) {
      setValue('subcategory', validSubcategories);
    }
  }, [selectedCategory, subcategoryOptions, selectedSubcategory, setValue]);

  const onSubmit: SubmitHandler<Step3Data> = async (data) => {
    if (!step1Data.email || !step1Data.password) {
      alert('Ошибка: данные регистрации повреждены');
      navigate('/register/step1');
      return;
    }

    const userName = step2Data.firstName?.trim() || step1Data.email.split('@')[0] || 'Пользователь';

    // Собираем все данные из шагов 1–3
    const registrationData = {
      email: step1Data.email,
      password: step1Data.password,
      name: userName,
      // Данные из шага 2 (если они сохранены в step2Data)
      birthDate: step2Data.birthDate || '',
      gender: step2Data.gender || '',
      city: step2Data.city || '',
      // Навыки из шага 3
      teachSkillsTitle: data.title,
      teachSkills: data.subcategory[0] || '',
      learnSkills: data.subcategory,
      about: data.description,
    };

    try {
      await dispatch(registerUser(registrationData)).unwrap();
      setIsRegistered(true);
      dispatch(clearRegistration());
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Ошибка регистрации: ${error || 'Неизвестная ошибка'}`);
    }
  };

  const handleBack = () => {
    navigate('/register/step2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formContent}>
        {/* Название навыка */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div className={styles.formGroup}>
              <InputUI
                {...field}
                label="Название навыка"
                placeholder="Введите название вашего навыка"
                error={errors.title?.message}
                className={errors.title ? styles.inputError : ''}
              />
            </div>
          )}
        />

        {/* Категория */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className={styles.formGroup}>
              <div className={styles.dropDownWrapper}>
                <MultiSelectDropdownUI
                  label="Категория навыка"
                  placeholder="Выберите категории"
                  options={categories.map((c) => ({
                    id: c.id,
                    label: c.title,
                    value: c.title,
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                />
              </div>
              {errors.category && (
                <span className={styles.errorMessage}>{errors.category.message}</span>
              )}
            </div>
          )}
        />

        {/* Подкатегория */}
        <Controller
          name="subcategory"
          control={control}
          render={({ field }) => (
            <div className={styles.formGroup}>
              <div className={styles.dropDownWrapper}>
                <MultiSelectDropdownUI
                  label="Подкатегория навыка"
                  placeholder="Выберите подкатегории"
                  options={subcategoryOptions.map((s, index) => ({
                    id: index,
                    label: s,
                    value: s,
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                  disabled={!selectedCategory?.length}
                />
              </div>
              {errors.subcategory && (
                <span className={styles.errorMessage}>{errors.subcategory.message}</span>
              )}
            </div>
          )}
        />

        {/* Описание */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className={styles.formGroup}>
              <div className={styles.textareaWrapper}>
                <InputUI
                  {...field}
                  label="Описание"
                  placeholder="Коротко опишите, чему можете научить"
                  type="textarea"
                  rows={4}
                  maxLength={500}
                  error={errors.description?.message}
                  className={errors.description ? styles.inputError : ''}
                />
              </div>
            </div>
          )}
        />
      </div>

      <div className={styles.formActions}>
        <ButtonUI variant="secondary" title="Назад" onClick={handleBack} type="button" />
        <ButtonUI
          variant="primary"
          title="Зарегистрироваться"
          type="submit"
          disabled={!isValid || isSubmitting}
        />
      </div>
    </form>
  );
};