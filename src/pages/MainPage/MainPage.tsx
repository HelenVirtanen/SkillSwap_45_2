import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { fetchAllUsers } from '@app/store/slices/User/usersSlise';
import { selectFavouritesCountMap } from '@app/store/slices/likes/likesSlice';
import UsersCatalog from '@widgets/UsersCatalog/UsersCatalog';
import FilterSidebar, {
  Filters,
} from '@shared/ui/FiltersSidebar/FiltersSidebar';
import styles from './MainPage.module.css';
import { selectCategories } from '@app/store/slices/staticData/staticDataSlice';
import { useUserFilters } from '@shared/utils/useUserFilters.ts';
import UsersFilteredCatalog from '@widgets/UsersCatalog/UsersFilteredCatalog.tsx';
import { isEqual } from 'lodash';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { mappedUsers, allUsers, status, error } = useAppSelector(
    (state) => state.users,
  );

  const likesMap = useAppSelector(selectFavouritesCountMap);
  const categories = useAppSelector(selectCategories);

  const defaultFilters = {
    cities: [],
    skillCategories: [],
    skillSubcategories: [],
    gender: 'any',
    teachStatus: 'all',
  };
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  /* ---------------- ФИЛЬТРАЦИЯ ---------------- */

  const filteredUsers = useUserFilters(mappedUsers, filters, categories);

  /* ---------------- ПОПУЛЯРНЫЕ ---------------- */

  const popularUsers = [...filteredUsers]
    .sort((a, b) => {
      const likesA = likesMap[Number(a.id)] || 0;
      const likesB = likesMap[Number(b.id)] || 0;
      return likesB - likesA;
    })
    .slice(0, 6);

  /* ---------------- НОВЫЕ ---------------- */

  const newUsers = [...allUsers]
    .filter((u) => filteredUsers.some((f) => f.id === String(u.id)))
    .sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
    )
    .slice(0, 6)
    .map((u) => filteredUsers.find((f) => f.id === String(u.id))!);

  /* ---------------- РЕКОМЕНДУЕМ ---------------- */

  const recommendedUsers = [...filteredUsers].sort(() => Math.random() - 0.5);

  return (
    <div className={styles.mainContainer}>
      <FilterSidebar
        filters={filters}
        defaultFilters={defaultFilters}
        onFiltersChange={setFilters}
      />

      {status === 'loading' && <div>Загрузка пользователей...</div>}
      {status === 'failed' && <div>Ошибка: {error}</div>}

      {status === 'succeeded' &&
        (isEqual(filters, defaultFilters) ? (
          <UsersCatalog
            popularUsers={popularUsers}
            newUsers={newUsers}
            recommendedUsers={recommendedUsers}
          />
        ) : (
          <UsersFilteredCatalog filteredUsers={filteredUsers} />
        ))}
    </div>
  );
};;

export default MainPage;
