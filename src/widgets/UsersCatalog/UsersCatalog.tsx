import styles from './UsersCatalog.module.css';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import UserCardsGroup, {
  IUserCardData,
} from '../UserCardsGroup/UserCardsGroup';
import ChevronRight from '@assets/icons/chevron-right.svg?react';

const mockUsers: IUserCardData[] = [
  {
    id: '1',
    avatar: 'https://i.pravatar.cc/300?img=1',
    name: 'Анна Иванова',
    birthDate: '1995-06-15',
    city: 'Москва',
    teachingSkill: { title: 'Английский', variant: 'languages' },
    learningSkills: [{ title: 'Дизайн', variant: 'art' }],
    isFavorite: false,
  },
  {
    id: '2',
    avatar: 'https://i.pravatar.cc/300?img=2',
    name: 'Иван Петров',
    birthDate: '1993-03-10',
    city: 'Санкт-Петербург',
    teachingSkill: { title: 'React', variant: 'education' },
    learningSkills: [{ title: 'Испанский', variant: 'languages' }],
    isFavorite: true,
  },
  {
    id: '3',
    avatar: 'https://i.pravatar.cc/300?img=3',
    name: 'Мария Смирнова',
    birthDate: '1998-11-22',
    city: 'Казань',
    teachingSkill: { title: 'Йога', variant: 'health' },
    learningSkills: [{ title: 'Французский', variant: 'languages' }],
  },
];

export const UsersCatalog = () => {
  return (
    <main className={styles.catalog}>
      {/* Популярное */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>Популярное</h1>
          <ButtonUI variant="tertiary" title="Смотреть все" iconRight={<ChevronRight />} className={styles.buttonCatalog}></ButtonUI> 
        </div>

        <UserCardsGroup users={mockUsers} showFavorite />
      </section>

      {/* Новое */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>Новое</h1>
          <ButtonUI variant="tertiary" title="Смотреть все" iconRight={<ChevronRight />} className={styles.buttonCatalog} />
        </div>

        <UserCardsGroup users={mockUsers} />
      </section>

      {/* Рекомендуем */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h1>Рекомендуем</h1>
        </div>

        <UserCardsGroup users={[...mockUsers, ...mockUsers, ...mockUsers]} />
      </section>
    </main>
  );
};
