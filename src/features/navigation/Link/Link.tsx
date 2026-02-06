import React from 'react';
import styles from './Link.module.css';

// описал интерфейс для Link
interface LinkProps {
  title: string;
  href?: string;
  isActive?: boolean;
  variant?: 'default' | 'primary' | 'secondary'; 
  // default  обычный текстовый линк для навигации
  // primary  основная кнопка с зелёным фоном (Зарегистрироваться, Далее, Продолжить, Подробнее)
  // secondary   второстепенная кнопка (Войти, Назад — обычно без фона)

}

const Link: React.FC<LinkProps> = ({title, href = '/', isActive = false, variant = 'default',}) => {
  return (
    <a href={href}
       className={`${styles.link} ${styles[variant]} ${isActive ? styles.active : ''}`}>
        {title}
      </a>
  );
}
export default Link;