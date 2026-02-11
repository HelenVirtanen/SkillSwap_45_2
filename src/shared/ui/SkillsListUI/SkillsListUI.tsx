import React, { useEffect, useRef, useState } from 'react';
import SkillTagUI, { ISkillTagUIProps } from '../SkillTagUI/SkillTagUI';
import styles from './SkillsListUI.module.css';

export interface ISkillsListUIProps {
  teachingSkill: ISkillTagUIProps; // Один навык, которому может научить
  learningSkills: ISkillTagUIProps[]; // Список навыков, которым хочет научиться
}

const SkillsListUI: React.FC<ISkillsListUIProps> = ({ 
  teachingSkill, 
  learningSkills
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(learningSkills.length);

  // Пересчитываем видимые теги при изменении списка learningSkills
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;

    let totalWidth = 0;
    let count = 0;

    // Суммируем ширину тегов, пока не заполним контейнер
    for (let i = 0; i < learningSkills.length; i++) {
      const el = tagRefs.current[i];
      if (!el) continue;

      totalWidth += el.offsetWidth + 4; // 4px - gap между тегами

      if (totalWidth > containerWidth) {
        break;
      }
      count++;
    }

    setVisibleCount(count);
  }, [learningSkills]);

  const visibleSkills = learningSkills.slice(0, visibleCount);
  const hiddenCount = learningSkills.length - visibleSkills.length;

  return (
    <div className={styles.container}>
      {/* Секция "Может научить" */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Может научить:</h3>
        <div className={styles.skillsRow}>
          <SkillTagUI 
            title={teachingSkill.title} 
            variant={teachingSkill.variant} 
          />
        </div>
      </div>

      {/* Секция "Хочет научиться" */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Хочет научиться:</h3>
        <div className={styles.skillsRow} ref={containerRef}>
          {/* Рендерим все теги, но визуально показываем только видимые */}
          {learningSkills.map((skill, index) => (
            <div
              key={skill.title}
              ref={(el) => {
                tagRefs.current[index] = el;
              }}
              className={index >= visibleCount ? styles.hiddenMeasure : ''}
            >
              {/* Показываем тег только если он входит в видимые */}
              {index < visibleCount && (
                <SkillTagUI title={skill.title} variant={skill.variant} />
              )}
            </div>
          ))}
          {/* Показываем счетчик скрытых тегов, если они есть */}
          {hiddenCount > 0 && (
            <SkillTagUI title={`+${hiddenCount}`} variant="other" />
          )}
        </div>
      </div>
    </div>
  );
};


export default SkillsListUI;
