import React from 'react';
import styles from './UserCardsGroup.module.css';

import UserCard from '../UserCard/UserCard';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI'


interface ISkill {
  title: string;
  variant?: 'business' | 'languages' | 'home' | 'art' | 'education' | 'health' | 'other';
}

export interface IUserCardData {
  id: string;
  avatar: string;
  name: string;
  birthDate: string;
  city: string;
  gender?: string;
  teachingSkill: ISkill;
  learningSkills: ISkill[];
  isFavorite?: boolean;
}

export interface UserCardsGroupProps {
  users: IUserCardData[];
  showFavorite?: boolean;
  onFavoriteToggle?: (userId: string) => void;
  onMessageClick?: (userId: string) => void;
}

const UserCardsGroup: React.FC<UserCardsGroupProps> = ({
  users,
  showFavorite = false,
  onFavoriteToggle,
  onMessageClick
}) => {
  return (
    <section className={styles.section}>
      {/* Сетка карточек - всегда 3 колонки на десктопе, управление через CSS */}
      <div className={styles.grid}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            avatar={user.avatar}
            name={user.name}
            birthDate={user.birthDate}
            city={user.city}
            teachingSkill={user.teachingSkill}
            learningSkills={user.learningSkills}
            isFavorite={showFavorite ? user.isFavorite : false}
            onFavoriteToggle={onFavoriteToggle ? () => onFavoriteToggle(user.id) : () => {}}
            onMessageClick={onMessageClick ? () => onMessageClick(user.id) : undefined}
          />
        ))}
      </div>

      {/* Пустое состояние */}
      {users.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Нет пользователей для отображения</p>
          <ButtonUI variant="primary" title="Обновить" />
        </div>
      )}
    </section>
  );
};

export default UserCardsGroup;