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

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { mappedUsers, allUsers, status, error } = useAppSelector(
    (state) => state.users,
  );

  const likesMap = useAppSelector(selectFavouritesCountMap);
  const categories = useAppSelector(selectCategories);

  const [filters, setFilters] = useState<Filters>({
    cities: [],
    skillCategories: [],
    skillSubcategories: [],
    gender: 'any',
    teachStatus: 'all',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  /* ---------------- ФИЛЬТРАЦИЯ ---------------- */

  const filteredUsers = mappedUsers.filter((user) => {
    const cityMatch =
      filters.cities.length === 0 ||
      filters.cities.some((city) => city.name === user.city);

    let skillMatch = true;

    if (
      filters.skillCategories.length > 0 ||
      filters.skillSubcategories.length > 0
    ) {
      const selectedCategoryTitles = filters.skillCategories.map(
        (c) => c.title,
      );

      const selectedSubcategoryTitles = filters.skillSubcategories.map(
        (s) => s.title,
      );

      if (filters.teachStatus === 'needLearn') {
        skillMatch = user.learningSkills.some((skill) =>
          selectedSubcategoryTitles.includes(skill.title),
        );
      } else if (filters.teachStatus === 'canTeach') {
        const userSkillTitle = user.teachingSkill.title;

        const directMatch =
          selectedSubcategoryTitles.includes(userSkillTitle);

        const categoryMatch = selectedCategoryTitles.some(
          (categoryTitle) => {
            const category = categories.find(
              (c) => c.title === categoryTitle,
            );

            return category?.subcategories.some(
              (sub) => sub.title === userSkillTitle,
            );
          },
        );

        skillMatch = directMatch || categoryMatch;
      } else {
        const userSkillTitle = user.teachingSkill.title;

        const teachDirectMatch =
          selectedSubcategoryTitles.includes(userSkillTitle);

        const teachCategoryMatch = selectedCategoryTitles.some(
          (categoryTitle) => {
            const category = categories.find(
              (c) => c.title === categoryTitle,
            );

            return category?.subcategories.some(
              (sub) => sub.title === userSkillTitle,
            );
          },
        );

        const learnMatch = user.learningSkills.some((skill) =>
          selectedSubcategoryTitles.includes(skill.title),
        );

        skillMatch =
          teachDirectMatch || teachCategoryMatch || learnMatch;
      }
    }

    const genderMatch =
      filters.gender === 'any' || user.gender === filters.gender;

    return cityMatch && skillMatch && genderMatch;
  });

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
    .filter((u) =>
      filteredUsers.some((f) => f.id === String(u.id)),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() -
        new Date(a.createdAt!).getTime(),
    )
    .slice(0, 6)
    .map(
      (u) =>
        filteredUsers.find((f) => f.id === String(u.id))!,
    );

  /* ---------------- РЕКОМЕНДУЕМ ---------------- */

  const recommendedUsers = [...filteredUsers].sort(
    () => Math.random() - 0.5,
  );

  return (
    <div className={styles.mainContainer}>
      <FilterSidebar filters={filters} onFiltersChange={setFilters} />

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
