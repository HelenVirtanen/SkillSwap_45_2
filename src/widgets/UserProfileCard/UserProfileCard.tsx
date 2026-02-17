import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './UserProfileCard.module.css';
import { calculateAge, getAgeWithLabel } from '@shared/utils/calculateAge';
import FavoriteButtonUI from '@shared/ui/FavoriteButtonUI/FavoriteButtonUI';
import SkillTagUI from '@shared/ui/SkillTagUI/SkillTagUI';

export interface UserProfileCardProps {
  user: {
    id: string;
    avatar: string;
    name: string;
    birthDate: string;
    city: string;
    isFavorite?: boolean;
    about?: string;
    teachingSkill: {
      title: string;
      variant: 'business' | 'languages' | 'home' | 'art' | 'education' | 'health' | 'other';
    };
    learningSkills: Array<{
      title: string;
      variant: 'business' | 'languages' | 'home' | 'art' | 'education' | 'health' | 'other';
    }>;
  };
  showFavorite?: boolean;
  onFavoriteToggle?: (userId: string) => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  user, 
  showFavorite = false,
  onFavoriteToggle 
}) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const tag1Ref = useRef<HTMLDivElement>(null);
  const tag2Ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateVisibleTags = () => {
      const containerWidth = containerRef.current?.offsetWidth || 260;

      const tag1Width = tag1Ref.current?.offsetWidth || 0;
      const tag2Width = tag2Ref.current?.offsetWidth || 0;
      const counterWidth = counterRef.current?.offsetWidth || 0;

      const gap = 8; 

      const twoTagsPlusCounter =
        tag1Width + gap + tag2Width + gap + counterWidth;

      if (twoTagsPlusCounter <= containerWidth && user.learningSkills.length >= 2) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    const timeoutId = setTimeout(calculateVisibleTags, 50);
    window.addEventListener('resize', calculateVisibleTags);

    return () => {
      window.removeEventListener('resize', calculateVisibleTags);
      clearTimeout(timeoutId);
    };
  }, [user.learningSkills]);

  const handleFavoriteToggle = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(user.id);
    }
  };

  const age = calculateAge(user.birthDate);
  const ageLabel = getAgeWithLabel(age);

  const visibleSkills = user.learningSkills.slice(0, visibleCount);
  const hiddenCount = user.learningSkills.length - visibleSkills.length;

  return (
    <div className={clsx(
      styles.container,
      showFavorite && styles.showFavorite
    )}>
      {/* Блок с основной информацией о пользователе */}
      <div className={styles.userInfo}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
          </div>
          <div className={styles.infoContainer}>
            <h4 className={styles.userName}>{user.name}</h4>
            <div className={styles.userDetails}>
              <span>{user.city},</span>
              <span>{ageLabel}</span>
            </div>
          </div>
          <div className={styles.favoriteButton}>
            {showFavorite && (
              <FavoriteButtonUI 
                isActive={user.isFavorite} 
                onClick={handleFavoriteToggle} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Описание пользователя */}
      {user.about && (
        <p className={styles.about}>{user.about}</p>
      )}

      {/* Навыки пользователя */}
      <div className={styles.skillsSection}>
        {/* Секция "Может научить" */}
        <div className={styles.skillSection}>
          <h3 className={styles.skillTitle}>Может научить:</h3>
          <div className={styles.skillsRow}>
            <SkillTagUI 
              title={user.teachingSkill.title} 
              variant={user.teachingSkill.variant} 
            />
          </div>
        </div>

        {/* Секция "Хочет научиться" */}
        <div className={styles.skillSection}>
          <h3 className={styles.skillTitle}>Хочет научиться:</h3>
          <div className={styles.skillsRow} ref={containerRef}>
            {/* Скрытые теги для измерения */}
            {user.learningSkills.length > 0 && (
              <div
                ref={tag1Ref}
                style={{
                  position: 'absolute',
                  visibility: 'hidden',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              >
                <SkillTagUI
                  title={user.learningSkills[0].title}
                  variant={user.learningSkills[0].variant}
                />
              </div>
            )}

            {user.learningSkills.length > 1 && (
              <div
                ref={tag2Ref}
                style={{
                  position: 'absolute',
                  visibility: 'hidden',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              >
                <SkillTagUI
                  title={user.learningSkills[1].title}
                  variant={user.learningSkills[1].variant}
                />
              </div>
            )}

            <div
              ref={counterRef}
              style={{
                position: 'absolute',
                visibility: 'hidden',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            >
              <SkillTagUI
                title={`+${user.learningSkills.length > 2 ? user.learningSkills.length - 2 : 1}`}
                variant="other"
              />
            </div>

            {/* Видимые теги */}
            {visibleSkills.map((skill) => (
              <SkillTagUI 
                key={skill.title} 
                title={skill.title} 
                variant={skill.variant} 
              />
            ))}
            
            {hiddenCount > 0 && (
              <SkillTagUI title={`+${hiddenCount}`} variant="other" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;