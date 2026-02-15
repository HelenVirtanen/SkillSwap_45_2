import styles from './RegisterPageStep1.module.css';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import GoogleIcon from '@assets/icons/logo/google-logo.svg?react';
import AppleIcon from '@assets/icons/logo/apple-logo.svg?react';
import BulbIcon from '@assets/illustrations/light-bulb.svg?react';
import InputUI from '@shared/ui/InputUI/InputUI';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';
import Stepper from '@widgets/Stepper/Stepper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPageStep1: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState<
    string | undefined
  >(undefined);

  const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [emailErrorText, setEmailErrorText] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordHelperText('Пароль должен содержать не менее 8 знаков');
    } else {
      navigate('/register/step2');
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newPassword = e.target.value;
    setPassword(e.target.value);

    if (newPassword.length >= 8) {
      setPasswordHelperText('Надёжный');
    } else {
      setPasswordHelperText(undefined);
    }
  };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setEmail(e.target.value);
  // }

  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
      <Stepper currentStep={1} />
      </div>
      <div className={styles.content}>
        <div className={styles.register}>
          <div className={styles.loginWith}>
            <ButtonUI
              variant="social"
              title="Продолжить с Google"
              iconLeft={<GoogleIcon />}
            />
            <ButtonUI
              variant="social"
              title="Продолжить с Apple"
              iconLeft={<AppleIcon />}
            />
          </div>
          <div className={styles.divider}>
            <span>или</span>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className={styles.registerForm}
          >
            <div className={styles.registerForm__inputContainer}>
              <InputUI
                label="Email"
                // onChange={handleEmailChange}
                onChange={() => {}}
                placeholder="Введите email"
                type="email"
                // error="Email уже используется"
              />
              <InputUI
                label="Пароль"
                onChange={handlePasswordChange}
                placeholder="Придумайте надёжный пароль"
                type="password"
                helperText={passwordHelperText}
              />
            </div>
            <ButtonUI
              variant="submit"
              title="Далее"
              type="submit"
              className={styles.registerForm__submit}
            />
          </form>
         
        </div>
        <IllustrationPanel
          image={<BulbIcon />}
          title="Добро пожаловать в SkillSwap!"
          description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
        />
      </div>
    </div>
  );
};

export default RegisterPageStep1;
