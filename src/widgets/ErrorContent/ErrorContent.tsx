import React from 'react';
import styles from './ErrorContent.module.css';
import ButtonUI from '../../shared/ui/ButtonUI';

interface ErrorContentProps {
  image: React.ReactNode;
  title: string;
  description: string;
}

const ErrorContent: React.FC<ErrorContentProps> = ({
  image,
  title,
  description,
}) => (
  <div className={styles.errorContainer}>
    <div className={styles.errorImage}>{image}</div>
    <h1 className={styles.errorTitle}>{title}</h1>
    <p className={styles.errorDescription}>{description}</p>
    <div className={styles.errorActions}>
      <ButtonUI 
        onClick={() => alert('Сообщить об ошибке')} 
        variant="secondary"
        title="Сообщить об ошибке"
      />
      <ButtonUI
        onClick={() => {
          window.location.href = '/';
        }}
        variant="primary"
        title="На главную"
      />
    </div>
  </div>
);

export default ErrorContent;