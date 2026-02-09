import type { FC } from 'react';
import styles from './AboutSkill.module.css';

export interface AboutSkillProps {
  title: string;
  category: string;
  subcategory: string;
  description: string; //305 сиволов
  actions?: React.ReactNode;
}

export const AboutSkill: FC<AboutSkillProps> = ({
  title,
  category,
  subcategory,
  description,
  actions,
}) => {
  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.category}>
          {category} / {subcategory}
        </p>
      </div>

      <p className={styles.description}>{description}</p>

      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </section>
  );
};
