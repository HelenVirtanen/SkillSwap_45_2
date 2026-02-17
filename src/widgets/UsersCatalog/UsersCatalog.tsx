import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UsersCatalog.module.css';
import Section from '../Section/Section';
import Loader from '@shared/ui/Loader/Loader';
import type { IUserCardData } from '../UserCardsGroup/UserCardsGroup';

const LOAD_LIMIT = 20;

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
  const navigate = useNavigate(); 
  const [visibleCount, setVisibleCount] = useState(LOAD_LIMIT);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + LOAD_LIMIT, recommendedUsers.length),
          );
        }
      },
      {
        rootMargin: '100px',
      },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [recommendedUsers.length]);

  const visibleRecommended = recommendedUsers.slice(0, visibleCount);
  const hasMore = visibleCount < recommendedUsers.length;

  // Обработчик клика на "Подробнее"
  const handleDetailsClick = (userId: string) => {
    navigate(`/skill/${userId}`);
  };

  return (
    <main className={styles.catalog}>
      <Section
        title="Популярное"
        users={popularUsers}
        onShowAll={() => console.log('Показать все популярные')}
        onDetailsClick={handleDetailsClick}
      />

      <Section
        title="Новое"
        users={newUsers}
        onShowAll={() => console.log('Показать все новое')}
        onDetailsClick={handleDetailsClick} 
      />

      <Section
        title="Рекомендуем"
        users={visibleRecommended}
        onDetailsClick={handleDetailsClick}
      />

      {hasMore && (
        <div ref={loaderRef} className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </main>
  );
};

export default UsersCatalog;