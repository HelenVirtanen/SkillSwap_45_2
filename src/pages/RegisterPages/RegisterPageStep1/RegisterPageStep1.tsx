import styles from "./RegisterPageStep1.module.css";
import ButtonUI from "@shared/ui/ButtonUI/ButtonUI";
import googleLogo from "../../../assets/icons/logo/google-logo.svg";
import appleLogo from "../../../assets/icons/logo/apple-logo.svg";
import lightBulb from "../../../assets/illustrations/light-bulb.svg";
import InputUI from "@shared/ui/InputUI/InputUI";
import Stepper from "@widgets/Stepper/Stepper";

const RegisterPageStep1: React.FC = () => {

    return (
      <>
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
              <span className={styles.divider__text}>или</span>
            </div>
            <form action="">
              <InputUI 
                label="Email" 
                onChange={() => {}} 
                placeholder="Введите email"
                type="email"
                error="Email уже используется"
              />
              <InputUI 
                label="Пароль" 
                onChange={() => {}} 
                placeholder="Придумайте надёжный пароль" 
                type="password"
                error="Пароль должен содержать не менее 8 знаков"
              />
              <ButtonUI
                variant="submit"
                title="Далее"
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
      </>
    )
}

export default RegisterPageStep1;