
import React from 'react';
import Section from '@widgets/Section/Section';
import { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
import styles from './RelatedUsers.module.css';

interface RelatedUsersProps {
  users: IUserCardData[];
  onDetailsClick?: (userId: string) => void;
}

const RelatedUsers: React.FC<RelatedUsersProps> = ({ users, onDetailsClick }) => {
  return (
    <div className={styles.container}>
      <Section
        title="Похожие предложения"
        users={users}
        onShowAll={() => console.log('Show all related users')}
        onDetailsClick={onDetailsClick}
      />
    </div>
  );
};

export default RelatedUsers;