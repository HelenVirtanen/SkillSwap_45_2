import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { toggleFavorite, selectFavorites } from '@app/store/slices/favorites/favoritesSlice';

import UserCardsGroup, { IUserCardData } from '../../widgets/UserCardsGroup/UserCardsGroup';
import styles from './FavoritesPage.module.css';

const mockFavorites: IUserCardData[] = [
  {
    id: '1',
    avatar: '/src/assets/avatars/ivan.png',
    name: 'Иван',
    birthDate: '1992-07-15',
    city: 'Санкт-Петербург',
    isFavorite: true,
    teachingSkill: { title: 'Музыка и звук', variant: 'art' },
    learningSkills: [
      { title: 'Тайм-менеджмент', variant: 'business' },
      { title: 'Медитация', variant: 'health' },
      { title: 'Личный бренд', variant: 'business' },
    ],
  },
  {
    id: '3',
    avatar: '/src/assets/avatars/konstantin.png',
    name: 'Константин',
    birthDate: '1988-11-10',
    city: 'Новосибирск',
    isFavorite: true,
    teachingSkill: { title: 'Продажи и переговоры', variant: 'business' },
    learningSkills: [
      { title: 'Китайский', variant: 'languages' },
      { title: 'Приготовление еды', variant: 'home' },
      { title: 'Видеомонтаж', variant: 'art' },
    ],
  },
  {
    id: '6',
    avatar: '/src/assets/avatars/anna.png',
    name: 'Анна',
    birthDate: '1987-01-30',
    city: 'Казань',
    isFavorite: true,
    teachingSkill: { title: 'Рисование и иллюстрация', variant: 'art' },
    learningSkills: [
      { title: 'Питание и ЗОЖ', variant: 'health' },
      { title: 'Маркетинг и реклама', variant: 'business' },
      { title: 'Скорочтение', variant: 'education' },
    ],
  },
];

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const usersWithFavorites = mockFavorites.map(user => ({
    ...user,
    isFavorite: favorites.includes(user.id),
  }));

  const handleFavoriteToggle = (userId: string) => {
    dispatch(toggleFavorite(userId));
  };

  const handleMessageClick = (userId: string) => {
    console.log('Написать пользователю:', userId);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>

      <UserCardsGroup
        users={usersWithFavorites}
        onFavoriteToggle={handleFavoriteToggle}
        onMessageClick={handleMessageClick}
      />
    </div>
  );
};

export default FavoritesPage;
