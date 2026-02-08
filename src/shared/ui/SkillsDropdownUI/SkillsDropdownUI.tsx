import React, { useState, useEffect, useRef } from 'react';
import styles from './SkillsDropdownUI.module.css';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const SkillsDropdownUI: React.FC = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch('/db/skills.json');
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      const data = await response.json();
      setSkills(data);
    };

    fetchSkills();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Все навыки
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {skills.map((category) => (
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
