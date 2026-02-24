import React, { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import InputUI from '@shared/ui/InputUI/InputUI';
import styles from './Step3SkillInfo.module.css';
import { DropzoneUI } from '@shared/ui/DropzoneUI/DropzoneUI';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { registerUser } from '@app/store/slices/authUser/auth';
import { clearRegistration, setStep3Data } from '@app/store/slices/registration/registrationSlice';
import { useNavigate } from 'react-router-dom';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';
import { updateMyProfileApi } from '@api/api';

// Тип данных формы
export interface Step3Data {
  title: string;
  category: string[]; // ← массив (мультивыбор)
  subcategory: string[]; // ← массив (мультивыбор)
  description: string;
  image?: File; // ← опционально
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
    .max(300, 'Описание не должно превышать 300 символов')
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

const FAKE_IMAGE_URL = 'https://placehold.co/600x400';

export const Step3SkillInfo: React.FC<Step3SkillInfoProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  // Данные из предыдущих шагов регистрации
  const step1Data = useAppSelector((state) => state.registration.step1);
  const step2Data = useAppSelector((state) => state.registration.step2);
  const storedStep3Data = useAppSelector((state) => state.registration.step3);

  // Категории из статических данных
  const categories = useAppSelector(selectCategories);

  // Защита от прямого перехода на шаг 3 без данных шага 1
  useEffect(() => {
    if (isCompleted) return;

    if (!step1Data.email || !step1Data.password) {
      navigate('/register/step1', { replace: true });
    }
  }, [step1Data, navigate, isCompleted]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    getValues
  } = useForm<Step3Data>({
    resolver: yupResolver(schema) as any, // ← временно для задачи #209
    mode: 'onChange',
    defaultValues: {
      title: storedStep3Data.title || initialData?.title || '',
      category: storedStep3Data.category || initialData?.category || [],
      subcategory: storedStep3Data.subcategory || initialData?.subcategory || [],
      description: storedStep3Data.description || initialData?.description || '',
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
    const validSubcategories =
      selectedSubcategory?.filter((sub) => subcategoryOptions.includes(sub)) || [];

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

  const onSubmit = async (data: Step3Data) => {
    if (!step1Data.email || !step1Data.password) {
      navigate('/register/step1');
      return;
    }

    const userName =
      step2Data.firstName?.trim() ||
      step1Data.email.split('@')[0] ||
      'Пользователь';

    try {
      // 1. Регистрация (только базовые данные)
      await dispatch(
        registerUser({
          email: step1Data.email,
          password: step1Data.password,
          name: userName,
        })
      ).unwrap();

      // 2. Обновление профиля (всегда, даже без картинки)
      const updateData = {
        birthDate: step2Data.birthDate || '',
        gender: step2Data.gender || '',
        city: step2Data.city || '',
        teachSkillsTitle: data.title,
        teachSkills: data.subcategory[0] || '',
        learnSkills: data.subcategory,
        about: data.description,
        // Заглушка для аватарки (если выбрано фото)
        avatar: data.image ? FAKE_IMAGE_URL : undefined,
        photosOnAbout: data.image ? [FAKE_IMAGE_URL] : [],
      };

      await updateMyProfileApi(updateData);

      setIsCompleted(true);
      dispatch(clearRegistration());
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Ошибка регистрации');
    }
  };

  const handleBack = () => {
    const currentFormValues = getValues(); 
    dispatch(setStep3Data(currentFormValues));

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

        {/* Изображение (оставляем, но серверу отправляем заглушку) */}
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