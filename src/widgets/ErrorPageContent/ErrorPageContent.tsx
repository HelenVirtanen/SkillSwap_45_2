import React from 'react';
import styles from './ErrorPageContent.module.css';
import Button from '../../features/Button/Button';

interface ErrorPageContentProps {
  image: React.ReactNode;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const ErrorPageContent: React.FC<ErrorPageContentProps> = ({
  image,
  title,
  description,
}) => (
  <div className={styles.errorPageContent}>
    <div className={styles.image}>{image}</div>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
    <div className={styles.actions}>
      <Button onClick={() => alert('Сообщить об ошибке')} variant="secondary">
        Сообщить об ошибке
      </Button>
      <Button
        onClick={() => {
          window.location.href = '/';
        }}
      >
        На главную
      </Button>
    </div>
  </div>
);

export default ErrorPageContent;