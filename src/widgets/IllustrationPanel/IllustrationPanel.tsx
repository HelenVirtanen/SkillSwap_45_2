import React from 'react';
import styles from './IllustrationPanel.module.css';

type IllustrationPanelProps = {
  image: React.ReactNode;
  title: string;
  description: string;
};

export const IllustrationPanel: React.FC<IllustrationPanelProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <section className={styles.panel}>
      <div className={styles.image}>{image}</div>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};
