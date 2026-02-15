import { FC } from 'react';
import styles from './UsersCatalog.module.css';
import Section from '../Section/Section';
import type { IUserCardData } from '../UserCardsGroup/UserCardsGroup';

interface UsersCatalogProps {
  popularUsers: IUserCardData[];
  newUsers: IUserCardData[];
  recommendedUsers: IUserCardData[];
}

const UsersCatalog: FC<UsersCatalogProps> = ({
  popularUsers,
  newUsers,
  recommendedUsers,
}) => {
  return (
    <main className={styles.catalog}>
      {/* Секция "Популярное" */}
      <Section
        title="Популярное"
        users={popularUsers}
        onShowAll={() => console.log('Показать все популярные')}
      />

      {/* Секция "Новое" */}
      <Section
        title="Новое"
        users={newUsers}
        onShowAll={() => console.log('Показать все новое')}
      />

      {/* Секция "Рекомендуем" — без кнопки */}
      <Section
        title="Рекомендуем"
        users={recommendedUsers}
      />
    </main>
  );
};

export default UsersCatalog;