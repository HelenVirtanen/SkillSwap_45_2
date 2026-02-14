import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import InputUI from '@shared/ui/InputUI/InputUI';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import styles from './Step3SkillInfo.module.css';
import {DropzoneUI} from '@shared/ui/DropzoneUI/DropzoneUI';

// Типы данных формы (убрали tagging)
export interface Step3Data {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image: File;
}

// Схема валидации Yup (убрали tagging)
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
    .required('Загрузите изображение')
    .test('fileSize', 'Файл не должен превышать 2 МБ', (value: unknown) => {
      const file = value as File | null;
      return file ? file.size <= 2 * 1024 * 1024 : false;
    })
    .test('fileType', 'Разрешены только JPEG и PNG', (value: unknown) => {
      const file = value as File | null;
      return file ? ['image/jpeg', 'image/png'].includes(file.type) : false;
    }),
});

interface Step3SkillInfoProps {
   onNext: (data: Step3Data) => void;
  onBack: () => void;
  initialData?: Partial<Step3Data>;
}

export const Step3SkillInfo: React.FC<Step3SkillInfoProps> = ({
  onNext,
  onBack,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
  } = useForm<Step3Data>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || '',
      subcategory: initialData?.subcategory || '',
      description: initialData?.description || '',
      image: undefined,
    },
  });

  // Обработчик загрузки изображения
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
    }
  };

  // Отправка формы
  const onSubmit = (data: Step3Data) => {
  onNext(data);
};

  // Варианты категорий для DropDownUI
  const categoryOptions = [
    'Творчество и искусство',
    'Бизнес и карьера',
    'Здоровье и лайфстайл',
    'Образование и развитие',
    'Иностранные языки',
    'Дом и уют',
  ];

  // Варианты подкатегорий (такие же как категории)
  const subcategoryOptions = [
    'Рисование и иллюстрация',
    'Фотография',
    'Видеомонтаж',
    'Музыка и звук',
    'Актёрское мастерство',
    'Креативное письмо',
    'Арт-терапия',
    'Декор и DIY',
  ];

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
              <DropDownUI
                title="Категория навыка"
                value={field.value}
                options={categoryOptions}
                onChange={field.onChange}
                widthDepOnContent={false}
                placeholder='Выберите категорию навыка'
              />
              {errors.category && (
                <span className={styles.errorMessage}>
                  {errors.category.message}
                </span>
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
              <DropDownUI
                title="Подкатегория навыка"
                value={field.value}
                options={subcategoryOptions}
                onChange={field.onChange}
                widthDepOnContent={false}
                placeholder='Выберите подкатегорию навыка'
              />
              {errors.subcategory && (
                <span className={styles.errorMessage}>
                  {errors.subcategory.message}
                </span>
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
                <span className={styles.errorMessage}>
                  {errors.image.message as string}
                </span>
              )}
            </div>
          )}
        />
      </div>

      {/* Кнопки навигации */}
      <div className={styles.formActions}>
        <ButtonUI
          variant="secondary"
          title="Назад"
          onClick={onBack}
          type="button"
        />
        <ButtonUI
          variant="primary"
          title="Продолжить"
          type="submit"
          disabled={!isValid || isSubmitting}
        />
      </div>
    </form>
  );
};