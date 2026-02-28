import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppSelector } from '@app/store/store';
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
import FiltersButtons from '@shared/ui/FiltersButtons/FiltersButtons.tsx';

type OutletContextType = {
  searchQuery: string;
};

const MainPage: React.FC = () => {
  const { mappedUsers, allUsers, status, error } = useAppSelector(
    (state) => state.users,
  );

  const likesMap = useAppSelector(selectFavouritesCountMap);
  const categories = useAppSelector(selectCategories);
  const { searchQuery } = useOutletContext<OutletContextType>();

  /* ---------------- ФИЛЬТРАЦИЯ ---------------- */

  const defaultFilters = {
    cities: [],
    skillCategories: [],
    skillSubcategories: [],
    gender: 'any',
    teachStatus: 'all',
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const normalizedQuery = searchQuery.trim().toLowerCase();

const searchFilteredUsers = normalizedQuery
  ? mappedUsers.filter((user) => {
      const teachingMatch = user.teachingSkill.title
        .toLowerCase()
        .includes(normalizedQuery);

      const learningMatch = user.learningSkills.some((skill) =>
        skill.title.toLowerCase().includes(normalizedQuery)
      );

      return teachingMatch || learningMatch;
    })
  : mappedUsers;

  const filteredUsers = useUserFilters(
  searchFilteredUsers,
  filters,
  categories
);

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
          <div className={styles.catalogContainer}>
            <FiltersButtons
              filters={filters}
              defaultFilters={defaultFilters}
              onFiltersChange={setFilters}
            />
            <UsersFilteredCatalog filteredUsers={filteredUsers} />
          </div>
        ))}
    </div>
  );
};

export default MainPage;
