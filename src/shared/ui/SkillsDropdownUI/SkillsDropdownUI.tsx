import React, { Dispatch, SetStateAction, RefObject } from 'react';
import styles from './SkillsDropdownUI.module.css';

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

interface Props {
  skills: SkillCategory[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

const SkillsDropdownUI: React.FC<Props> = ({ skills, isOpen, setIsOpen, dropdownRef }) => {
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.dropdownButtonOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Все навыки
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {skills.map(category => (
            <div key={category.title} className={styles.category}>
              <img
                src={`src/assets/icons/${category.icon}`}
                alt={category.title}
                className={styles.categoryIcon}
              />
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.skillList}>
                {category.skills.map((skill, index) => (
                  <li key={index} className={styles.skillItem}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsDropdownUI;
