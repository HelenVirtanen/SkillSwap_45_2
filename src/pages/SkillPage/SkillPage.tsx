import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfileCard from '@widgets/UserProfileCard/UserProfileCard';
import SkillCard from '@widgets/SkillCard/SkillCard';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import Loader from '@shared/ui/Loader/Loader';
import styles from './SkillPage.module.css';
import { getProfileByIdApi, getProfileByIdAuthApi } from '@api/api';
import { useAppSelector } from '@app/store/store';

// Интерфейсы
interface ISkill {
  title: string;
  variant: 'business' | 'languages' | 'home' | 'art' | 'education' | 'health' | 'other';
}

interface IUser {
  id: string;
  avatar: string;
  name: string;
  birthDate: string;
  city: string;
  about?: string;
  teachingSkill: ISkill;
  learningSkills: ISkill[];
  isFavorite?: boolean;
  photosOnAbout?: string[];
}

interface ISkillData {
  id: string | number;
  title: string;
  categories?: string[];
  description?: string;
  images?: string[];
}

const determineSkillVariant = (skillTitle: string): ISkill['variant'] => {
  const lowerTitle = skillTitle.toLowerCase();
  
  if (lowerTitle.includes('бизнес') || lowerTitle.includes('менеджмент') || lowerTitle.includes('business')) {
    return 'business';
  }
  if (lowerTitle.includes('язык') || lowerTitle.includes('english') || lowerTitle.includes('languages')) {
    return 'languages';
  }
  if (lowerTitle.includes('дом') || lowerTitle.includes('ремонт') || lowerTitle.includes('home')) {
    return 'home';
  }
  if (lowerTitle.includes('рис') || lowerTitle.includes('дизайн') || lowerTitle.includes('art')) {
    return 'art';
  }
  if (lowerTitle.includes('образование') || lowerTitle.includes('курс') || lowerTitle.includes('education')) {
    return 'education';
  }
  if (lowerTitle.includes('здоров') || lowerTitle.includes('спорт') || lowerTitle.includes('health')) {
    return 'health';
  }
  
  return 'other';
};

// Функция для получения тестовых изображений, если нет фото
const getDefaultImages = (): string[] => {
  return [
    '/assets/illustrations/drumming-main.png',
    '/assets/illustrations/drumming-2.png',
    '/assets/illustrations/drumming-3.png',
    '/assets/illustrations/drumming-4.png',
  ];
};

const SkillPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const auth = useAppSelector(state => (state as any).auth);
  const isAuthenticated = auth?.isAuthenticated || false;

  const loadUserData = useCallback(async () => {
    if (!id) {
      setError('ID пользователя не указан');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Загрузка данных пользователя с ID:', id);
      
      const userData = isAuthenticated 
        ? await getProfileByIdAuthApi(Number(id))
        : await getProfileByIdApi(Number(id));
      
      console.log('Полученные данные пользователя:', userData);
      
      if (!userData) {
        throw new Error('Данные пользователя не получены');
      }
      

      const formattedUser: IUser = {
        id: userData.id?.toString() || id,
        avatar: userData.avatar || '/avatars/user-photo.png',
        name: userData.name || 'Пользователь',
        birthDate: userData.birthDate || '2000-01-01',
        city: userData.city || 'Город не указан',
        about: userData.about || '',
        teachingSkill: {
          title: userData.teach_skills?.skills || 'Навык не указан',
          variant: determineSkillVariant(userData.teach_skills?.skills || '')
        },
        learningSkills: (userData.learn_skills || []).map(skill => ({
          title: skill,
          variant: determineSkillVariant(skill)
        })),
        isFavorite: userData.isFavourite || false,
        photosOnAbout: userData.photosOnAbout || []
      };
      
      console.log('Отформатированный пользователь:', formattedUser);
      setUser(formattedUser);
      setError(null);
      
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
      setError('Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleProposeExchange = () => {
    console.log('Предложить обмен пользователю:', id);

  };

  const handleFavoriteToggle = (userId: string) => {
    console.log('Избранное toggled для пользователя:', userId);

  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
        <p className={styles.loaderText}>Загрузка профиля пользователя...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.errorContainer}>
        <h2>Ошибка загрузки</h2>
        <p>{error || 'Пользователь не найден'}</p>
        <div className={styles.errorActions}>
          <ButtonUI 
            title="Вернуться на главную" 
            variant="primary" 
            onClick={() => navigate('/')} 
          />
          <ButtonUI 
            title="Попробовать снова" 
            variant="secondary" 
            onClick={loadUserData} 
          />
        </div>
      </div>
    );
  }

  // Формируем данные навыка
  const skillImages = user.photosOnAbout && user.photosOnAbout.length > 0
    ? user.photosOnAbout
    : getDefaultImages();

  const skill: ISkillData = {
    id: `${user.id}-teaching`,
    title: user.teachingSkill.title,
    categories: user.learningSkills.map(s => s.title).slice(0, 3),
    description: user.about || `Пользователь ${user.name} готов поделиться своими знаниями и навыками.`,
    images: skillImages
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Левая колонка - Карточка пользователя */}
        <div className={styles.leftColumn}>
          <UserProfileCard
            user={user}
            showFavorite={false}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>

        {/* Правая колонка - Карточка навыка */}
        <div className={styles.rightColumn}>
          <SkillCard
            skill={skill}
            proposeExchange={
              <ButtonUI
                title="Предложить обмен"
                variant="primary"
                className={styles.exchangeButton}
                onClick={handleProposeExchange}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SkillPage;