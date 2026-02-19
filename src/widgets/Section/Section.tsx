import React from 'react';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import UserCardsGroup from '@widgets/UserCardsGroup/UserCardsGroup';
import { IUserCardData } from '../../widgets/UserCardsGroup/UserCardsGroup';
import styles from './Section.module.css';
import ChevronRight from '@assets/icons/chevron-right.svg?react';
import Sort from '@assets/icons/sort.svg?react';

export interface SectionProps {
  title: string;
  users: IUserCardData[];
  withFilter?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  onDetailsClick?: (userId: string) => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  users,
  withFilter,
  buttonText,
  onButtonClick,
  onDetailsClick,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {onButtonClick && (
          <div
            className={
              withFilter ? `${styles.sortButton}` : styles.buttonWrapper
            }
          >
            <ButtonUI
              variant="tertiary"
              title={buttonText || 'Смотреть всё'}
              iconRight={withFilter ? '' : <ChevronRight />}
              iconLeft={withFilter ? <Sort /> : ''}
              onClick={onButtonClick}
            />
          </div>
        )}
      </div>

      <UserCardsGroup users={users} onDetailsClick={onDetailsClick} />
    </section>
  );
};

export default Section;