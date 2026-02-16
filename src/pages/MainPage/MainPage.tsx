import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/store'; 
import { fetchAllUsers } from '@app/store/slices/User/usersSlise'; 
import UsersCatalog from '@widgets/UsersCatalog/UsersCatalog';
import FilterSidebar from '@shared/ui/FiltersSidebar/FiltersSidebar';
import styles from './MainPage.module.css';
import { selectCities } from '@app/store/slices/staticData/staticDataSlice';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mappedUsers, status, error } = useAppSelector(state => state.user); 

  // берём города из стора
  const cities = useAppSelector(selectCities);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUsers());
    }

    // Выводим города в консоль при каждом обновлении
    console.log('Города из стора на MainPage:', cities);
  }, [status, dispatch, cities]); // cities в зависимостях, чтобы видеть изменения

  // Распределяем пользователей по секциям
  const popularUsers = mappedUsers.slice(0, 6);
  const newUsers = mappedUsers.slice(6, 12);
  const recommendedUsers = mappedUsers.slice(12, 18);

  return (
    <div className={styles.mainContainer}>
      <FilterSidebar />

      {status === 'loading' && <div>Загрузка пользователей...</div>}
      {status === 'failed' && <div>Ошибка: {error}</div>}

      {status === 'succeeded' && (
        <UsersCatalog
          popularUsers={popularUsers}
          newUsers={newUsers}
          recommendedUsers={recommendedUsers}
        />
      )}
    </div>
  );
};

export default MainPage;