import React, { useEffect, useRef, useState } from 'react';
import styles from './UserCard.module.css';
import UserInfoUI from '@shared/ui/UserInfoUI/UserInfoUI'
import SkillTagUI from '@shared/ui/SkillTagUI/SkillTagUI'

interface ISkill {
  title: string;
  variant?: 'business' | 'languages' | 'home' | 'art' | 'education' | 'health' | 'other';
}

interface IUserCardProps {
  avatar: string;
  name: string;
  birthDate: string;
  city: string;
  teachingSkill: ISkill;
  learningSkills: ISkill[];
  isFavorite?: boolean;
  onFavoriteToggle: () => void;
  onMessageClick?: () => void;
}

const UserCard: React.FC<IUserCardProps> = ({
  avatar,
  name,
  birthDate,
  city,
  teachingSkill,
  learningSkills,
  isFavorite = false,
  onFavoriteToggle,
  onMessageClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tag1Ref = useRef<HTMLDivElement>(null);
  const tag2Ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  
  const [visibleCount, setVisibleCount] = useState(1); // По умолчанию 1

  useEffect(() => {
    const calculateVisibleTags = () => {
      const containerWidth = containerRef.current?.offsetWidth || 284;
      
      // Получаем ширины тегов
      const tag1Width = tag1Ref.current?.offsetWidth || 0;
      const tag2Width = tag2Ref.current?.offsetWidth || 0;
      const counterWidth = counterRef.current?.offsetWidth || 0;
      
      const gap = 4; // gap между тегами

      // Пробуем поместить 2 тега + счетчик
      const twoTagsPlusCounter = tag1Width + gap + tag2Width + gap + counterWidth;
      
      if (twoTagsPlusCounter <= containerWidth && learningSkills.length >= 2) {
        // Помещается 2 тега + счетчик
        setVisibleCount(2);
      } else {
        // Не помещается - показываем 1 тег + счетчик
        setVisibleCount(1);
      }
    };

    // Даем время на отрисовку тегов
    const timeoutId = setTimeout(calculateVisibleTags, 50);
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', calculateVisibleTags);
    
    return () => {
      window.removeEventListener('resize', calculateVisibleTags);
      clearTimeout(timeoutId);
    };
  }, [learningSkills]);

  const visibleSkills = learningSkills.slice(0, visibleCount);
  const hiddenCount = learningSkills.length - visibleSkills.length;

  return (
    <article className={styles.card}>
      {/* UserInfo секция */}
      <div className={styles.userInfo}>
        <UserInfoUI
          avatar={avatar}
          name={name}
          birthDate={birthDate}
          city={city}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      </div>

      {/* Skills секция */}
      <div className={styles.skills}>
        <div className={styles.skillsContainer}>
          {/* Может научить */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Может научить:</h4>
            <div className={styles.skillsRow}>
              <SkillTagUI 
                title={teachingSkill.title} 
                variant={teachingSkill.variant || 'other'} 
              />
            </div>
          </div>

          {/* Хочет научиться */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Хочет научиться:</h4>
            <div className={styles.skillsRow} ref={containerRef}>
              {/* Скрытые теги для измерения */}
              {learningSkills.length > 0 && (
                <div 
                  ref={tag1Ref}
                  style={{ 
                    position: 'absolute', 
                    visibility: 'hidden', 
                    pointerEvents: 'none',
                    zIndex: -1
                  }}
                >
                  <SkillTagUI 
                    title={learningSkills[0].title} 
                    variant={learningSkills[0].variant || 'other'} 
                  />
                </div>
              )}
              
              {learningSkills.length > 1 && (
                <div 
                  ref={tag2Ref}
                  style={{ 
                    position: 'absolute', 
                    visibility: 'hidden', 
                    pointerEvents: 'none',
                    zIndex: -1
                  }}
                >
                  <SkillTagUI 
                    title={learningSkills[1].title} 
                    variant={learningSkills[1].variant || 'other'} 
                  />
                </div>
              )}
              
              <div 
                ref={counterRef}
                style={{ 
                  position: 'absolute', 
                  visibility: 'hidden', 
                  pointerEvents: 'none',
                  zIndex: -1
                }}
              >
                <SkillTagUI 
                  title={`+${learningSkills.length > 2 ? learningSkills.length - 2 : 1}`} 
                  variant="other" 
                />
              </div>
              
              {/* Видимые теги */}
              {visibleSkills.map((skill, index) => (
                <SkillTagUI 
                  key={index}
                  title={skill.title} 
                  variant={skill.variant || 'other'} 
                />
              ))}
              
              {/* Счетчик скрытых тегов */}
              {hiddenCount > 0 && (
                <SkillTagUI 
                  title={`+${hiddenCount}`} 
                  variant="other" 
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions секция - только кнопка "Подробнее" */}
      <div className={styles.actions}>
        <button 
          className={styles.messageButton}
          onClick={onMessageClick}
        >
          Подробнее
        </button>
      </div>
    </article>
  );
};

export default UserCard;