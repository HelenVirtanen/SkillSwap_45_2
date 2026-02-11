import React from 'react';
import styles from './SkillTagUI.module.css';

export type TSkillVariant =
  | 'business'
  | 'languages'
  | 'home'
  | 'art'
  | 'education'
  | 'health'
  | 'other';

export interface ISkillTagUIProps {
  title: string;
  variant?: TSkillVariant;
  className?: string;
}

const SkillTagUI: React.FC<ISkillTagUIProps> = ({
  title,
  variant = 'other',
  className = '',
}) => {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${className}`}>
      {title}
    </span>
  );
};

export default SkillTagUI;
