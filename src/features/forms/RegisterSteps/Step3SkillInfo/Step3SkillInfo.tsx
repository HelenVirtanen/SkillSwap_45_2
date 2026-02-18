import React, { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import InputUI from '@shared/ui/InputUI/InputUI';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import styles from './Step3SkillInfo.module.css';
import { DropzoneUI } from '@shared/ui/DropzoneUI/DropzoneUI';
import { TSkillCategory } from '@api/api';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { registerUser } from '@app/store/slices/authUser/auth';
import { clearRegistration } from '@app/store/slices/registration/registrationSlice';
import { useNavigate } from 'react-router-dom';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';

// Тип данных формы
export interface Step3Data {
  title: string;
  category: string[];      // ← массив (мультивыбор)
  subcategory: string[];   // ← массив (мультивыбор)
  description: string;
  image?: File;            // ← опционально
}

// Схема валидации Yup
const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Название должно содержать от 3 до 50 символов')
    .max(50, 'Название должно содержать от 3 до 50 символов')
    .required('Обязательное поле'),
  category: yup
    .array()
    .min(1, 'Выберите хотя бы одну категорию')
    .required('Выберите категорию'),
  subcategory: yup
    .array()
    .min(1, 'Выберите хотя бы одну подкатегорию')
    .required('Выберите подкатегорию'),
  description: yup
    .string()
    .max(500, 'Описание не должно превышать 500 символов')
    .required('Обязательное поле'),
  image: yup
    .mixed<File>()
    .optional()
    .test('fileSize', 'Файл не должен превышать 2 МБ', (value: unknown) => {
      const file = value as File | null | undefined;
      return file ? file.size <= 2 * 1024 * 1024 : true;
    })
    .test('fileType', 'Разрешены только JPEG и PNG', (value: unknown) => {
      const file = value as File | null | undefined;
      return file ? ['image/jpeg', 'image/png'].includes(file.type) : true;
    }),
});

interface Step3SkillInfoProps {
  initialData?: Partial<Step3Data>;
}

export const Step3SkillInfo: React.FC<Step3SkillInfoProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Данные из предыдущих шагов регистрации
  const step1Data = useAppSelector((state) => state.registration.step1);
  const step2Data = useAppSelector((state) => state.registration.step2);

  // Категории из статических данных
  const categories = useAppSelector(selectCategories);

  // Защита от прямого перехода на шаг 3 без данных шага 1
  useEffect(() => {
    if (!step1Data.email || !step1Data.password) {
      console.warn('Данные регистрации отсутствуют. Перенаправляем на шаг 1.');
      navigate('/register/step1', { replace: true });
    }
  }, [step1Data, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<Step3Data>({
    resolver: yupResolver(schema) as any, // ← временно для задачи #209
    mode: 'onChange',
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || [],
      subcategory: initialData?.subcategory || [],
      description: initialData?.description || '',
      image: undefined,
    },
  });

  const selectedCategory = useWatch({
    control,
    name: 'category',
  });

  const selectedSubcategory = useWatch({
    control,
    name: 'subcategory',
  });

  // Опции подкатегорий на основе выбранных категорий
  const subcategoryOptions = React.useMemo(() => {
    if (!selectedCategory?.length) return [];

    return categories
      .filter((category) => selectedCategory.includes(category.title))
      .flatMap((category) => category.subcategories.map((sub) => sub.title));
  }, [selectedCategory, categories]);

  // Синхронизация подкатегорий: очищаем или обрезаем некорректные
  useEffect(() => {
  // Если категории не выбраны — очищаем подкатегории, если они не пусты
  if (!selectedCategory?.length) {
    if (selectedSubcategory?.length) {
      setValue('subcategory', []);
    }
    return;
  }

  // Фильтруем выбранные подкатегории, оставляя только те, что есть в subcategoryOptions
  const validSubcategories = selectedSubcategory?.filter((sub) => subcategoryOptions.includes(sub)) || [];

  // Сравниваем текущее значение с валидным по содержимому
  const currentSubStr = JSON.stringify(selectedSubcategory || []);
  const validSubStr = JSON.stringify(validSubcategories);

  if (currentSubStr !== validSubStr) {
    setValue('subcategory', validSubcategories);
  }
}, [selectedCategory, subcategoryOptions, selectedSubcategory, setValue]);

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

        {/* Категория (мультивыбор) */}
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

        {/* Подкатегория (мультивыбор) */}
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