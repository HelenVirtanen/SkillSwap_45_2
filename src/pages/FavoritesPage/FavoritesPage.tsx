import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { useNavigate } from 'react-router-dom';
import UserCardsGroup from '../../widgets/UserCardsGroup/UserCardsGroup';
import { 
  selectMappedUsers,
  selectUsersStatus,
  fetchAllUsers
} from '../../app/store/slices/User/usersSlise';
import { toggleFavorite, selectFavorites } from '../../app/store/slices/favorites/favoritesSlice';
import styles from './FavoritesPage.module.css';

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const mappedUsers = useAppSelector(selectMappedUsers);
  const status = useAppSelector(selectUsersStatus);
  const favoriteIds = useAppSelector(selectFavorites);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  const favoriteUsers = mappedUsers.filter(user => favoriteIds.includes(Number(user.id)));

  const handleFavoriteToggle = (userId: number) => {
    dispatch(toggleFavorite(userId));
  };

  const handleMessageClick = (userId: string) => {
    console.log('Написать пользователю:', userId);
  };

  const handleDetailsClick = (userId: string) => {
    navigate(`/skill/${userId}`);
  };

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Избранное</h1>
        <div className={styles.loader}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      
      {favoriteUsers.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>У вас пока нет избранных пользователей</p>
        </div>
      ) : (
        <UserCardsGroup
          users={favoriteUsers}
          onFavoriteToggle={handleFavoriteToggle}
          onMessageClick={handleMessageClick}
          onDetailsClick={handleDetailsClick}
        />
      )}
    </div>
  );
};

export default FavoritesPage;