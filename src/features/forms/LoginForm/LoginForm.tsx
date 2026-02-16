import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputUI from '@shared/ui/InputUI/InputUI';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import styles from './LoginForm.module.css';
import GoogleIcon from '@assets/icons/logo/google-logo.svg?react';
import AppleIcon from '@assets/icons/logo/apple-logo.svg?react';
import { loginUserApi } from '@api/api';
import { setCookie } from '@features/auth/cookie';

const INVALID_CREDENTIALS =
  'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных';

const validationSchema = Yup.object().shape({
  email: Yup.string().required(INVALID_CREDENTIALS).email(INVALID_CREDENTIALS),
  password: Yup.string()
    .min(8, INVALID_CREDENTIALS)
    .required(INVALID_CREDENTIALS),
});

type UserData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(validationSchema),
  });

  const submitHandler = async (data: UserData) => {
    try {
      const response = await loginUserApi(data);
      console.log('Успешный вход:', response);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
    } catch (error) {
      console.error('Ошибка входа:', error);
    } finally {
      reset();
    }
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
            error={errors.email?.message}
          />

          <InputUI
            {...register('password')}
            label="Пароль"
            type="password"
            placeholder="Введите ваш пароль"
            error={
              errors.email || errors.password ? INVALID_CREDENTIALS : undefined
            }
          />
        </div>

        <div className={styles.loginButtonsWrapper}>
          <ButtonUI variant="primary" type="submit" title="Войти" />
          <ButtonUI
            variant="tertiary"
            type="button"
            title="Зарегистрироваться"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
