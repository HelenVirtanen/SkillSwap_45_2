import styles from "./RegisterPageStep1.module.css";
import ButtonUI from "@shared/ui/ButtonUI/ButtonUI";
import googleLogo from "../../../assets/icons/logo/google-logo.svg";
import appleLogo from "../../../assets/icons/logo/apple-logo.svg";
import lightBulb from "../../../assets/illustrations/light-bulb.svg";
import InputUI from "@shared/ui/InputUI/InputUI";
import Stepper from "@widgets/Stepper/Stepper";
import { useState } from "react";

const RegisterPageStep1: React.FC = () => {
    const [password, setPassword] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState<string | undefined>(undefined);

    // const [email, setEmail] = useState('');
    // const [emailErrorText, setEmailErrorText] = useState<string | undefined>(undefined);

    const handleSubmit = (e: React.SubmitEvent) => {
      e.preventDefault();
      if (password.length < 8) {
        setPasswordHelperText('Пароль должен содержать не менее 8 знаков');
      } else {
        setPasswordHelperText('Надёжный');
      }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <Stepper/>
        <div className={styles.content} >
          <div className={styles.register}>
            <div className={styles.loginWith}>
              <ButtonUI
                variant="social"
                title="Продлжить с Google"
                iconLeft={<img src={googleLogo} alt="Google" className={styles.loginWith__button}/>}
              />
              <ButtonUI
                variant="social"
                title="Продлжить с Apple"
                iconLeft={<img src={appleLogo} alt="Apple" className={styles.loginWith__button}/>}
              />
            </div>
            <div className={styles.divider}>
              <span>или</span>
            </div>
            <form action="" onSubmit={handleSubmit} className={styles.registerForm}>
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
          <div className={styles.onBoarding}>
            <img src={lightBulb} alt="Изображение лампочки" className={styles.onBoardingImg}/>
            <div className={styles.onBoarding__textContainer}>
              <h2 className={styles.onBoardingTitle}>Добро пожаловать в SkillSwap!</h2>
              <p className={styles.onBoardingText}>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default RegisterPageStep1;