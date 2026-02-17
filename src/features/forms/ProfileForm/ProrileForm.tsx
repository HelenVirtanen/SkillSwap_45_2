import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import InputUI from '@shared/ui/InputUI/InputUI';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import DatePicker from '@widgets/DatePicker/DatePicker';

import styles from './ProrileForm.module.css';

export type ProfileFormData = {
  email: string;
  name: string;
  birthDate: string | null;
  gender: string | null;
  city: string | null;
  about: string | undefined;
};

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormData>;
  cities: string[];
  onSubmit: () => void;
  onChangePassword: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  cities,
  onSubmit,
  onChangePassword,
}) => {
  const {
    control,
    formState: { errors, isDirty }, // ← добавляем isDirty
  } = form;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* Почта */}
      <div className={styles.emailSection}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputUI
              {...field}
              label="Почта"
              type="email"
              placeholder="Введите email"
              error={errors.email?.message}
              editIcon
            />
          )}
        />

        {/* Кнопка изменения пароля */}
        <ButtonUI
          variant="simple"
          title="Изменить пароль"
          onClick={onChangePassword}
          type="button"
        />
      </div>

      {/* Имя */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputUI
            {...field}
            label="Имя"
            type="string"
            placeholder="Введите имя"
            error={errors.name?.message}
            className={styles.profileItem}
            editIcon
          />
        )}
      />

      {/* Дата рождения */}
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            title="Дата рождения"
            placeholder="Выберите дату"
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.toISOString().split('T')[0] : null);
            }}
            classNameInput={styles.profileCol1}
          />
        )}
      />

      {/* Пол */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <DropDownUI
            title="Пол"
            value={field.value ?? undefined}
            options={['Женский', 'Мужской']}
            onChange={field.onChange}
            className={styles.profileCol2}
          />
        )}
      />

      {/* Город */}
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <DropDownUI
            title="Город"
            value={field.value ?? undefined}
            options={cities}
            onChange={field.onChange}
            className={styles.profileItem}
          />
        )}
      />

      {/* О себе */}
      <Controller
        name="about"
        control={control}
        render={({ field }) => (
          <InputUI
            {...field}
            label="О себе"
            type="textarea"
            placeholder="Расскажите о себе"
            rows={4}
            error={errors.about?.message}
            className={styles.profileItem}
            editIcon
          />
        )}
      />

      {/* Кнопка сохранения */}
      <ButtonUI
        variant="primary"
        type="submit"
        title="Сохранить"
        className={styles.profileSubmitButton}
        disabled={!isDirty} // ← кнопка неактивна, пока нет изменений
      />
    </form>
  );
};

export default ProfileForm;
