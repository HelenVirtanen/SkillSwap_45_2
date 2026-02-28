import styles from './AboutPage.module.css';

const AboutPage: React.FC = () => {
  return (
    <>
      <h1 className={styles.heading}>Страница О проекте</h1>
      <p className={styles.description}>
        Проект «SkillSwap» — платформа обмена навыками «Я научу / Хочу
        научиться»
      </p>
    </>
  );
};

export default AboutPage;
