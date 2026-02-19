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
import { useAppSelector } from '@app/store/store';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice';
import { MultiSelectDropdownUI } from '@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI';

// Типы данных формы (убрали tagging)
export interface Step3Data {
  title: string;
  category: string[];
  subcategory: string[];
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
  category: yup
    .array()
    .min(1, 'Выберите хотя бы одну категорию')
    .required(),
  subcategory: yup
    .array()
    .min(1, 'Выберите хотя бы одну подкатегорию')
    .required(),
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
  
  const categories = useAppSelector(selectCategories)

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
      image: undefined,
    },
  });

  const selectedCategory = useWatch({
    control,
    name: 'category',
  });


  const subcategoryOptions = React.useMemo(() => {
    if (!selectedCategory?.length) return [];
  
    return categories
      .filter((category) =>
        selectedCategory.includes(category.title)
      )
      .flatMap((category) =>
        category.subcategories.map((sub) => sub.title)
      );
  }, [selectedCategory, categories]);
  

  const selectedSubcategory = useWatch({
    control,
    name: 'subcategory',
  });

  useEffect(() => {
    if (!selectedCategory) {
      setValue('subcategory', []);
      return;
    }
  
    const validSubcategories =
    selectedSubcategory?.filter((sub) =>
      subcategoryOptions.includes(sub)
    ) || [];
  
    if (validSubcategories.length !== selectedSubcategory?.length) {
      setValue('subcategory', validSubcategories);
    }
  }, [
    selectedCategory,
    subcategoryOptions,
    selectedSubcategory,
    setValue,
  ]);

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