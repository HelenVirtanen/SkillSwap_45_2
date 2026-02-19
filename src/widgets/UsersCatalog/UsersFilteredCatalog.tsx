import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UsersCatalog.module.css';
import Section from '../Section/Section';
import type { IUserCardData } from '../UserCardsGroup/UserCardsGroup';


interface UsersFilteredCatalogProps {
  filteredUsers: IUserCardData[]
}

const UsersFilteredCatalog: FC<UsersFilteredCatalogProps> = ({ filteredUsers }) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleDetailsClick = (userId: string) => {
    navigate(`/skill/${userId}`);
  };

  const handleSortClick = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const idA = Number(a.id);
      const idB = Number(b.id);

      return sortOrder === 'asc'
        ? idA - idB // от старого к новому (меньший ID первым)
        : idB - idA; // от нового к старому (больший ID первым)
    });
  }, [filteredUsers, sortOrder]);

  return (
    <main className={styles.catalog}>
      <Section
        title={`Подходящие предложения: ${filteredUsers.length}`}
        users={sortedUsers}
        withFilter={true}
        buttonText={sortOrder === 'asc' ? 'Сначала новые' : 'Сначала старые'}
        onButtonClick={handleSortClick}
        onDetailsClick={handleDetailsClick}
      />
    </main>
  );
};

export default UsersFilteredCatalog;
