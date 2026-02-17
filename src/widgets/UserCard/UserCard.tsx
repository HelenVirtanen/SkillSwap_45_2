import React, { useEffect, useRef, useState } from 'react';
import styles from './UserCard.module.css';
import UserInfoUI from '@shared/ui/UserInfoUI/UserInfoUI';
import SkillTagUI from '@shared/ui/SkillTagUI/SkillTagUI';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';

interface ISkill {
  title: string;
  variant?:
    | 'business'
    | 'languages'
    | 'home'
    | 'art'
    | 'education'
    | 'health'
    | 'other';
}

interface IUserCardProps {
  id: string;
  avatar: string;
  name: string;
  birthDate: string;
  city: string;
  teachingSkill: ISkill;
  learningSkills: ISkill[];
  isFavorite?: boolean;
  onFavoriteToggle: () => void;
  onMessageClick?: () => void;
  onDetailsClick?: (userId: string) => void;
}

const UserCard: React.FC<IUserCardProps> = ({
  id,
  avatar,
  name,
  birthDate,
  city,
  teachingSkill,
  learningSkills,
  isFavorite = false,
  onFavoriteToggle,
  onDetailsClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tag1Ref = useRef<HTMLDivElement>(null);
  const tag2Ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const calculateVisibleTags = () => {
      const containerWidth = containerRef.current?.offsetWidth || 284;

      const tag1Width = tag1Ref.current?.offsetWidth || 0;
      const tag2Width = tag2Ref.current?.offsetWidth || 0;
      const counterWidth = counterRef.current?.offsetWidth || 0;

      const gap = 4;

      const twoTagsPlusCounter =
        tag1Width + gap + tag2Width + gap + counterWidth;

      if (twoTagsPlusCounter <= containerWidth && learningSkills.length >= 2) {
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
  }, [learningSkills]);

  const visibleSkills = learningSkills.slice(0, visibleCount);
  const hiddenCount = learningSkills.length - visibleSkills.length;

  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(id);
    }
  };

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

      {/* Skills секция*/}
      <div className={styles.skills}>
        <div className={styles.skillsContainer}>
          {/* Секция "Может научить" */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Может научить:</h4>
            <div className={styles.skillsRow}>
              {teachingSkill.title !== 'Не указано' ? (
                <SkillTagUI
                  title={teachingSkill.title}
                  variant={teachingSkill.variant || 'other'}
                />
              ) : (
                <span className={styles.emptySkill}>Не указано</span>
              )}
            </div>
          </div>

          {/* Секция "Хочет научиться" */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Хочет научиться:</h4>
            <div className={styles.skillsRow} ref={containerRef}>
              {learningSkills.length > 0 ? (
                <>
                  {/* Скрытые теги для измерения */}
                  {learningSkills.length > 0 && (
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
                        zIndex: -1,
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
                      zIndex: -1,
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

                  {hiddenCount > 0 && (
                    <SkillTagUI title={`+${hiddenCount}`} variant="other" />
                  )}
                </>
              ) : (
                <span className={styles.emptySkill}>Не указано</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions секция */}
      <div className={styles.actions}>
        <ButtonUI
          title="Подробнее"
          variant="primary"
          className={styles.messageButton}
          onClick={handleDetailsClick}
        />
      </div>
    </article>
  );
};

export default UserCard;