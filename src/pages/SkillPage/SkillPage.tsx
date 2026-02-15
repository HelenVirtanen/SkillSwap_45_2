import React from 'react';
import styles from './SkillPage.module.css';
import UserProfileCard from '@widgets/UserProfileCard/UserProfileCard';
import SkillCard from '@widgets/SkillCard/SkillCard';

// Интерфейсы
interface ISkill {
  title: string;
  variant: 'business' | 'languages' | 'home' | 'art' | 'education' | 'health' | 'other';
}

interface IUser {
  id: string;
  avatar: string;
  name: string;
  birthDate: string;
  city: string;
  about?: string;
  teachingSkill: ISkill;
  learningSkills: ISkill[];
  isFavorite?: boolean;
}

interface ISkillData {
  id: string | number;
  title: string;
  categories?: string[];
  description?: string;
  images?: string[];
}

interface ISkillPageProps {
  user: IUser;
  skill: ISkillData;
  onProposeExchange?: () => void;
  className?: string;
}

const SkillPage: React.FC<ISkillPageProps> = ({
  user,
  skill,
  onProposeExchange,
  className,
}) => {
  // Компонент кнопки "Предложить обмен"
  const ProposeExchangeButton = () => (
    <button 
      className={styles.exchangeButton}
      onClick={onProposeExchange}
    >
      Предложить обмен
    </button>
  );

  return (
    <div className={`${styles.page} ${className || ''}`}>
      {/* Основной контент */}
      <div className={styles.content}>
        {/* Левая колонка - Карточка пользователя */}
        <div className={styles.leftColumn}>
          <UserProfileCard
            user={user}
            showFavorite={false}
            onFavoriteToggle={(userId) => console.log('Favorite toggled:', userId)}
          />
        </div>

        {/* Правая колонка - Карточка навыка */}
        <div className={styles.rightColumn}>
          <SkillCard
            skill={skill}
            proposeExchange={<ProposeExchangeButton />}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillPage;