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
  console.log('recommendedUsers length:', recommendedUsers.length);
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(LOAD_LIMIT);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  //заглушка
  const handleShowAll = (section: string) => {
    alert(`Страница "Смотреть все ${section}" в разработке`);
    console.log(`Смотреть все: ${section}`);
  };

  // Сбрасываем количество при изменении данных
  useEffect(() => {
    setVisibleCount(LOAD_LIMIT);
  }, [recommendedUsers]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            const next = prev + LOAD_LIMIT;
            return next > recommendedUsers.length
              ? recommendedUsers.length
              : next;
          });
        }
      },
      {
        root: null, // window
        rootMargin: '200px', // подгружает заранее
        threshold: 0,
      }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [recommendedUsers.length]);

  const visibleRecommended = recommendedUsers.slice(0, visibleCount);
  const hasMore = visibleCount < recommendedUsers.length;

  const handleDetailsClick = (userId: string) => {
    navigate(`/skill/${userId}`);
  };

  return (
    <main className={styles.catalog}>
      <Section
        title="Популярное"
        users={popularUsers}
        onButtonClick={() => handleShowAll('Популярное')}
        onDetailsClick={handleDetailsClick}
      />

      <Section
        title="Новое"
        users={newUsers}
        onButtonClick={() => handleShowAll('Новое')}
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

