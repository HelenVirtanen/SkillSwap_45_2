import React, { Dispatch, SetStateAction, RefObject } from 'react';
import styles from './SkillsDropdownUI.module.css';

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  subcategories: {
    id: number;
    title: string;
  }[];
}

interface Props {
  skills: SkillCategory[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

const SkillsDropdownUI: React.FC<Props> = ({
  skills,
  isOpen,
  setIsOpen,
  dropdownRef,
}) => {
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.dropdownButtonOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Все навыки
      </button>

      <div
        className={`${styles.dropdownContent} ${isOpen ? styles.open : styles.closed}`}
      >
        {skills.map((category) => (
          <div key={category.id} className={styles.category}>
            <img
              src={`src/assets/icons/${category.icon}`}
              alt={category.title}
              className={styles.categoryIcon}
            />
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.skillList}>
              {category.subcategories?.map((sub, index) => (  // ← исправление здесь
                <li key={sub.id || index} className={styles.skillItem}>
                  {sub.title}
                </li>
              )) || <li>Подкатегорий нет</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDropdownUI;