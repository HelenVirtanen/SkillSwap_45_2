import React, { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import InputUI from '@shared/ui/InputUI/InputUI';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import styles from './Step3SkillInfo.module.css';
import { DropzoneUI } from '@shared/ui/DropzoneUI/DropzoneUI';
import { getSkills } from '@api/skills';
import { TSkillCategory } from '@api/api';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { registerUser } from '@app/store/slices/authUser/auth';
import { clearRegistration } from '@app/store/slices/registration/registrationSlice';
import { useNavigate } from 'react-router-dom';

// Тип данных формы (ручное объявление)
export interface Step3Data {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image: File | undefined; // обязательно, но может быть undefined
}

// Схема валидации Yup (изображение опционально)
const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Название должно содержать от 3 до 50 символов')
    .max(50, 'Название должно содержать от 3 до 50 символов')
    .required('Обязательное поле'),
  category: yup.string().required('Выберите категорию'),
  subcategory: yup.string().required('Выберите подкатегорию'),
  description: yup
    .string()
    .max(500, 'Описание не должно превышать 500 символов')
    .required('Обязательное поле'),
  image: yup
    .mixed<File>()
    .optional() 
    .test('fileSize', 'Файл не должен превышать 2 МБ', (value: unknown) => {
      const file = value as File | null;
      return file ? file.size <= 2 * 1024 * 1024 : true;
    })
    .test('fileType', 'Разрешены только JPEG и PNG', (value: unknown) => {
      const file = value as File | null;
      return file ? ['image/jpeg', 'image/png'].includes(file.type) : true;
    }),
});

interface Step3SkillInfoProps {
  initialData?: Partial<Step3Data>;
}

export const Step3SkillInfo: React.FC<Step3SkillInfoProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const step1Data = useAppSelector((state) => state.registration.step1);
  const step2Data = useAppSelector((state) => state.registration.step2);

  useEffect(() => {
    if (!step1Data.email || !step1Data.password) {
      console.warn('Данные регистрации отсутствуют. Перенаправляем на шаг 1.');
      navigate('/register/step1', { replace: true });
    }
  }, [step1Data, navigate]); 

  
  const [skillsData, setSkillsData] = useState<TSkillCategory[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<Step3Data>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || '',
      subcategory: initialData?.subcategory || '',
      description: initialData?.description || '',
      image: undefined,
    },
  });

  const selectedCategory = useWatch({
    control,
    name: 'category',
  });

  const subcategoryOptions = React.useMemo(() => {
    if (!selectedCategory || skillsData.length === 0) return [];
    const category = skillsData.find((c) => c.title === selectedCategory);
    return category?.skills || [];
  }, [selectedCategory, skillsData]);

  useEffect(() => {
    setValue('subcategory', '');
  }, [selectedCategory, setValue]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkillsData(data);
      } catch (error) {
        console.error('Ошибка загрузки категорий', error);
      }
    };
    fetchSkills();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (_data: Step3Data) => {
  // Защита: проверяем критические данные
  if (!step1Data.email || !step1Data.password) {
    alert('Ошибка: данные регистрации повреждены. Начните регистрацию заново.');
    navigate('/register/step1');
    return;
  }

  // Формируем имя (если не заполнено — берём из email)
  const userName = step2Data.firstName?.trim() || step1Data.email.split('@')[0] || 'Пользователь';

  const fullRegistrationData = {
    email: step1Data.email,
    password: step1Data.password,
    name: userName,
  };

  try {
    await dispatch(registerUser(fullRegistrationData)).unwrap();
    dispatch(clearRegistration());
    navigate('/profile');
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
      {/* JSX без изменений (как в вашем коде) */}
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
                <DropDownUI
                  title="Категория навыка"
                  value={field.value}
                  options={skillsData.map((c) => c.title)}
                  onChange={field.onChange}
                  widthDepOnContent={false}
                  placeholder="Выберите категорию навыка"
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
                <DropDownUI
                  title="Подкатегория навыка"
                  value={field.value}
                  options={subcategoryOptions}
                  onChange={field.onChange}
                  widthDepOnContent={false}
                  placeholder="Выберите подкатегорию навыка"
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

        {/* Изображение */}
        <Controller
          name="image"
          control={control}
          render={({ field: { value } }) => (
            <div className={styles.formGroup}>
              <div className={styles.dropzoneWrapper}>
                <DropzoneUI />
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                  id="skill-image"
                />
                <label htmlFor="skill-image" className={styles.fileOverlay}>
                  {value && (
                    <span className={styles.fileSelected}>
                      ✅ Файл выбран: {(value as File).name}
                    </span>
                  )}
                </label>
              </div>
              {errors.image && (
                <span className={styles.errorMessage}>{errors.image.message}</span>
              )}
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