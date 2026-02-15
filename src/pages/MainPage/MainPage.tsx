import { useEffect, useMemo, useState } from 'react';
import UsersCatalog from '@widgets/UsersCatalog/UsersCatalog';
import type { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
import type { TProfile } from '@api/api';
import FilterSidebar from '@shared/ui/FiltersSidebar/FiltersSidebar';
import Loader from '@shared/ui/Loader/Loader';
import styles from './MainPage.module.css';

type TUsersMock = {
  users: TProfile[];
};

const MainPage: React.FC = () => {
  const [usersData, setUsersData] = useState<TUsersMock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('/db/users.json');
        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        const data = await response.json();
        setUsersData(data);
      } catch (err: any) {
        setError(err.message || 'Не удалось загрузить пользователей');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const mapProfileToCard = (profile: TProfile): IUserCardData => ({
    id: String(profile.id),
    avatar: profile.avatar || 'https://i.pravatar.cc/300',
    name: profile.name,
    birthDate: profile.birthDate || '1990-01-01',
    city: profile.city || 'Город не указан',

    teachingSkill: {
      title: profile.teach_skills?.title || 'Навык не указан',
      variant: 'education' as const,
    },

    learningSkills: profile.learn_skills?.map((skill: string) => ({
      title: skill,
      variant: 'education' as const,
    })) || [],

    isFavorite: profile.isFavourite ?? false,
  });

  const mappedUsers = useMemo(() => {
     const users: TProfile[] = usersData?.users || [];
     return users.map(mapProfileToCard);
  }, [usersData]);

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.mainContainer}>
      <FilterSidebar />
      <UsersCatalog
      popularUsers={mappedUsers.slice(0, 6)}
      newUsers={mappedUsers.slice(6, 12)}
      recommendedUsers={mappedUsers.slice(12, 18)}
    />
    </div>
  );
};

export default MainPage;