import React from 'react';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import UserCardsGroup from '@widgets/UserCardsGroup/UserCardsGroup';
import { IUserCardData } from '../../widgets/UserCardsGroup/UserCardsGroup';
import styles from './Section.module.css';
import ChevronRight from '@assets/icons/chevron-right.svg?react';

export interface SectionProps {
  title: string;
  users: IUserCardData[];
  onShowAll?: () => void;
  onDetailsClick?: (userId: string) => void; 
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  users, 
  onShowAll,
  onDetailsClick 
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {onShowAll && (
          <div className={styles.buttonWrapper}>
            <ButtonUI
              variant="tertiary"
              title="Смотреть все"
              iconRight={<ChevronRight />}
              onClick={onShowAll}
            />
          </div>
        )}
      </div>

      <UserCardsGroup 
        users={users} 
        onDetailsClick={onDetailsClick} 
      />
    </section>
  );
};

export default Section;