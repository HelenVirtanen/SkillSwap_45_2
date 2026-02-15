import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputUI from '@shared/ui/InputUI/InputUI';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import styles from './Step1UserInfo.module.css';
import GoogleIcon from '@assets/icons/logo/google-logo.svg?react';
import AppleIcon from '@assets/icons/logo/apple-logo.svg?react';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Пожалуйста, введите email')
    .email('Некорректный адрес электронной почты'),
  password: Yup.string()
    .min(8, 'Минимальная длина пароля — 8 символов')
    .required('Пожалуйста, введите пароль'),
});

type UserData = {
  email: string;
  password: string;
};

const Step1UserInfo: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitHandler = async (data: UserData) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.buttonSocialWrapper}>
          <div className={styles.buttonSocial}>
            <ButtonUI
              variant="social"
              title="Продолжить с Google"
              iconLeft={<GoogleIcon />}
            />
          </div>
          <div className={styles.buttonSocial}>
            <ButtonUI
              variant="social"
              title="Продолжить с Apple"
              iconLeft={<AppleIcon />}
            />
          </div>
        </div>

        <div className={styles.orSeparator}>или</div>

        <div className={styles.inputWrapper}>
          <InputUI
            {...register('email')}
            label="Email"
            type="email"
            placeholder="Введите email"
            error={errors?.email?.message || undefined}
          />

          <InputUI
            {...register('password')}
            label="Пароль"
            type="password"
            placeholder="Придумайте надёжный пароль"
            helperText="Пароль должен содержать не менее 8 знаков"
            error={errors?.password?.message || undefined}
          />
        </div>

        <div className={styles.buttonNext}>
          <ButtonUI variant="primary" type="submit" title="Далее" />
        </div>
      </form>
    </div>
  );
};

export default Step1UserInfo;
