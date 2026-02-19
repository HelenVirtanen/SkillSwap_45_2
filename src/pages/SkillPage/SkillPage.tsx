import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@app/store/store';
import {
  fetchUserProfileById,
  selectCurrentProfileUser,
  selectProfileStatus,
  selectProfileError,
  clearProfileUser,
  toggleFavoriteInProfile,
} from '@app/store/slices/User/usersSlise';
import { selectAuthUser } from '@app/store/slices/authUser/auth';
import UserProfileCard from '@widgets/UserProfileCard/UserProfileCard';
import SkillCard from '@widgets/SkillCard/SkillCard';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import Loader from '@shared/ui/Loader/Loader';
import styles from './SkillPage.module.css';

// Интерфейсы
interface ISkill {
  title: string;
  variant:
    | 'business'
    | 'languages'
    | 'home'
    | 'art'
    | 'education'
    | 'health'
    | 'other';
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

  if (
    lowerTitle.includes('бизнес') ||
    lowerTitle.includes('менеджмент') ||
    lowerTitle.includes('business')
  ) {
    return 'business';
  }
  if (
    lowerTitle.includes('язык') ||
    lowerTitle.includes('english') ||
    lowerTitle.includes('languages')
  ) {
    return 'languages';
  }
  if (
    lowerTitle.includes('дом') ||
    lowerTitle.includes('ремонт') ||
    lowerTitle.includes('home')
  ) {
    return 'home';
  }
  if (
    lowerTitle.includes('рис') ||
    lowerTitle.includes('дизайн') ||
    lowerTitle.includes('art')
  ) {
    return 'art';
  }
  if (
    lowerTitle.includes('образование') ||
    lowerTitle.includes('курс') ||
    lowerTitle.includes('education')
  ) {
    return 'education';
  }
  if (
    lowerTitle.includes('здоров') ||
    lowerTitle.includes('спорт') ||
    lowerTitle.includes('health')
  ) {
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
  const dispatch = useAppDispatch();

  // Селекторы из usersSlise
  const userData = useAppSelector(selectCurrentProfileUser);
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileError);

  // Селекторы из auth слайса
  const authUser = useAppSelector(selectAuthUser);
  // Пользователь авторизован, если есть authUser
  const isAuthenticated = !!authUser;

  const [formattedUser, setFormattedUser] = useState<IUser | null>(null);

  // Загрузка данных пользователя
  useEffect(() => {
    if (id) {
      dispatch(
        fetchUserProfileById({
          userId: Number(id),
          isAuthenticated,
        }),
      );
    }

    // Очистка при размонтировании
    return () => {
      dispatch(clearProfileUser());
    };
  }, [id, isAuthenticated, dispatch]);

  // Форматирование данных при их получении из Redux
  useEffect(() => {
    if (userData && status === 'succeeded') {
      const formatted: IUser = {
        id: userData.id?.toString() || id || '',
        avatar: userData.avatar || '/avatars/user-photo.png',
        name: userData.name || 'Пользователь',
        birthDate: userData.birthDate || '',
        city: userData.city || 'Город не указан',
        about: userData.about || '',
        teachingSkill: {
          title: userData.teach_skills?.skills || 'Навык не указан',
          variant: determineSkillVariant(userData.teach_skills?.skills || ''),
        },
        learningSkills: (userData.learn_skills || []).map((skill) => ({
          title: skill,
          variant: determineSkillVariant(skill),
        })),
        isFavorite: userData.isFavourite || false,
        photosOnAbout: userData.photosOnAbout || [],
      };

      setFormattedUser(formatted);
    }
  }, [userData, status, id]);

  const handleProposeExchange = () => {
    console.log('Предложить обмен пользователю:', id);
    // Здесь будет логика для предложения обмена
  };

  const handleFavoriteToggle = (userId: string) => {
    dispatch(toggleFavoriteInProfile(userId));
  };

  // Обработка состояний загрузки
  if (status === 'loading') {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
        <p className={styles.loaderText}>Загрузка профиля пользователя...</p>
      </div>
    );
  }

  // Обработка ошибок
  if (status === 'failed' || error || !formattedUser) {
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
            onClick={() =>
              id &&
              dispatch(
                fetchUserProfileById({
                  userId: Number(id),
                  isAuthenticated,
                }),
              )
            }
          />
        </div>
      </div>
    );
  }

  // Формируем данные навыка
  const skillImages =
    formattedUser.photosOnAbout && formattedUser.photosOnAbout.length > 0
      ? formattedUser.photosOnAbout
      : getDefaultImages();

  const skill: ISkillData = {
    id: `${formattedUser.id}-teaching`,
    title: formattedUser.teachingSkill.title,
    categories: formattedUser.learningSkills.map((s) => s.title).slice(0, 3),
    description:
      formattedUser.about ||
      `Пользователь ${formattedUser.name} готов поделиться своими знаниями и навыками.`,
    images: skillImages,
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Левая колонка - Карточка пользователя */}
        <div className={styles.leftColumn}>
          <UserProfileCard
            user={formattedUser}
            showFavorite={true}
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
