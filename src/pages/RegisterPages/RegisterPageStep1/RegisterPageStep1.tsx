import styles from './RegisterPageStep1.module.css';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import GoogleIcon from '@assets/icons/logo/google-logo.svg?react';
import AppleIcon from '@assets/icons/logo/apple-logo.svg?react';
import BulbIcon from '@assets/illustrations/light-bulb.svg?react';
import InputUI from '@shared/ui/InputUI/InputUI';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';
import Stepper from '@widgets/Stepper/Stepper';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RegisterPageStep1: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Получаем данные из state
  const { returnTo, proposeExchange, targetUserId } = location.state || {};

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    if (!validateEmail(email)) {
      setEmailError('Некорректный email');
      isValid = false;
    } else {
      setEmailError(undefined);
    }
    
    if (password.length < 8) {
      setPasswordError('Пароль должен содержать не менее 8 символов');
      isValid = false;
    } else {
      setPasswordError(undefined);
    }
    
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Имитация успешной регистрации (без вызова реального API)
      console.log('✅ Регистрация успешна', { email, password });
      
      // Небольшая задержка для имитации запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // ВСЕГДА переходим на шаг 2, независимо от proposeExchange
      // Данные о предложении обмена передаем дальше по цепочке
      navigate('/register/step2', { 
        state: { 
          email, 
          password,
          returnTo,
          proposeExchange, // передаем дальше
          targetUserId // передаем дальше
        } 
      });
      
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setEmailError('Ошибка при регистрации. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(undefined);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(undefined);
  };

  const getPasswordHelperText = () => {
    if (password.length >= 8) return 'Надёжный пароль';
    if (password.length > 0) return `Ещё ${8 - password.length} символов`;
    return undefined;
  };

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
              disabled={isLoading}
            />
            <ButtonUI
              variant="social"
              title="Продолжить с Apple"
              iconLeft={<AppleIcon />}
              disabled={isLoading}
            />
          </div>
          <div className={styles.divider}>
            <span>или</span>
          </div>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.registerForm__inputContainer}>
              <InputUI
                label="Email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Введите email"
                type="email"
                error={emailError}
                disabled={isLoading}
              />
              <InputUI
                label="Пароль"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Придумайте надёжный пароль"
                type="password"
                helperText={getPasswordHelperText()}
                error={passwordError}
                disabled={isLoading}
              />
            </div>
            <ButtonUI
              variant="submit"
              title={isLoading ? "Регистрация..." : "Далее"}
              type="submit"
              className={styles.registerForm__submit}
              disabled={isLoading}
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