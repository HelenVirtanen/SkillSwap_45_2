import React from 'react';
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
  const handleFavoriteToggle = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(user.id);
    }
  };

  const age = calculateAge(user.birthDate);
  const ageLabel = getAgeWithLabel(age);

  // Показываем только 2 навыка, остальные за цифрой
  const MAX_VISIBLE_SKILLS = 2;
  const visibleSkills = user.learningSkills.slice(0, MAX_VISIBLE_SKILLS);
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
          <div className={styles.skillsRow}>
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