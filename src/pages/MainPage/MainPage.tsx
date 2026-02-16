import { useEffect, useMemo, useState } from 'react';
import UsersCatalog from '@widgets/UsersCatalog/UsersCatalog';
import type { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
import { getProfilesApi, type TProfile } from '@api/api';

const MainPage: React.FC = () => {
  const [users, setUsers] = useState<TProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getProfilesApi();

        if (!response.success) {
          throw new Error('Ошибка загрузки профилей');
        }

        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || 'Ошибка сервера');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const mapProfileToCard = (profile: TProfile): IUserCardData => ({
    id: String(profile.id),

    avatar: profile.avatar ?? '/avatars/default.png',

    name: profile.name,

    birthDate: profile.birthDate ?? 'Не указано',
    city: profile.city ?? 'Город не указан',

    teachingSkill: {
      title: profile.teach_skills?.title ?? 'Навык не указан',
      variant: 'education',
    },

    learningSkills:
      profile.learn_skills?.map((skill) => ({
        title: skill,
        variant: 'education',
      })) ?? [],

    isFavorite: false,
  });

  const mappedUsers = useMemo(
    () => users.map(mapProfileToCard),
    [users]
  );

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <UsersCatalog
      popularUsers={mappedUsers.slice(0, 6)}
      newUsers={mappedUsers.slice(6, 12)}
      recommendedUsers={mappedUsers.slice(12, 18)}
    />
  );
};

export default MainPage;
