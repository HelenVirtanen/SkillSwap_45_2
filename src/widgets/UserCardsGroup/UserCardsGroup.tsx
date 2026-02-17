import React from 'react';
import styles from './UserCardsGroup.module.css';
import UserCard from '../UserCard/UserCard';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { toggleFavorite, selectFavorites } from '@app/store/slices/favorites/favoritesSlice';

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
  onFavoriteToggle?: (userId: number) => void;
  onMessageClick?: (userId: string) => void;
  onDetailsClick?: (userId: string) => void;
}

const UserCardsGroup: React.FC<UserCardsGroupProps> = ({ users, onMessageClick, onDetailsClick }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {users.map(user => {
          const isFavorite = favorites.includes(Number(user.id));

          return (
            <UserCard
              id={user.id}
              key={user.id}
              avatar={user.avatar}
              name={user.name}
              birthDate={user.birthDate}
              city={user.city}
              teachingSkill={user.teachingSkill}
              learningSkills={user.learningSkills}
              isFavorite={isFavorite}
              onFavoriteToggle={() => dispatch(toggleFavorite(Number(user.id)))}
              onMessageClick={onMessageClick ? () => onMessageClick(user.id) : undefined}
              onDetailsClick={onDetailsClick}
            />
          );
        })}
      </div>

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
