import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Добавляем useLocation
import { useAppSelector, useAppDispatch } from '@app/store/store';
import { useModals } from '@shared/hooks/useModals';
import { 
  fetchUserProfileById,
  selectCurrentProfileUser,
  selectProfileStatus,
  selectProfileError,
  clearProfileUser,
  toggleFavoriteInProfile
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { openOfferSent } = useModals();
  
  // Получаем state из навигации (для авто-предложения после регистрации)
  const state = location.state as { shouldAutoPropose?: boolean; targetUserId?: string } | null;
  
  // Селекторы из usersSlise
  const userData = useAppSelector(selectCurrentProfileUser);
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileError);
  
  // Селекторы из auth слайса
  const authUser = useAppSelector(selectAuthUser);
  const isAuthenticated = !!authUser;

  const [formattedUser, setFormattedUser] = useState<IUser | null>(null);

  // Загрузка данных пользователя
  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfileById({ 
        userId: Number(id), 
        isAuthenticated 
      }));
    }

    return () => {
      dispatch(clearProfileUser());
    };
  }, [id, isAuthenticated, dispatch]);

  // Форматирование данных
  useEffect(() => {
    if (userData && status === 'succeeded') {
      const formatted: IUser = {
        id: userData.id?.toString() || id || '',
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
      
      setFormattedUser(formatted);
    }
  }, [userData, status, id]);

  // Эффект для автоматического открытия модалки предложения после регистрации
  useEffect(() => {
    if (state?.shouldAutoPropose && 
        state?.targetUserId === id && 
        isAuthenticated && 
        formattedUser && 
        formattedUser.id !== authUser?.id?.toString()) {
      
      console.log('🔄 Auto-proposing exchange after registration');
      
      // Небольшая задержка, чтобы всё прогрузилось
      setTimeout(() => {
        openOfferSent({
          userId: id,
          skillTitle: formattedUser.teachingSkill.title,
          context: 'skillPage',
        });
      }, 500);
      
      // Очищаем state, чтобы не открывать снова при ререндере
      navigate(`/skill/${id}`, { replace: true, state: {} });
    }
  }, [state, id, isAuthenticated, formattedUser, authUser, openOfferSent, navigate]);

  const handleProposeExchange = () => {
    console.log('Предложить обмен пользователю:', id);
    
    if (!formattedUser) return;
    
    // Проверяем, не свой ли это профиль
    if (authUser?.id?.toString() === id) {
      console.log('⏭️ This is your own profile, cannot propose exchange');
      return;
    }
    
    // Проверяем, авторизован ли пользователь
    if (!isAuthenticated) {
      console.log('🔴 User not authenticated, redirecting to login');
      // Сохраняем в state, куда вернуться после регистрации
      navigate('/register/step1', { 
        state: { from: `/skill/${id}`, proposeExchange: true }
      });
      return;
    }
    
    // Если авторизован - открываем модалку предложения
    console.log('✅ User authenticated, opening offer modal');
    openOfferSent({
      userId: id,
      skillTitle: formattedUser.teachingSkill.title,
      context: 'skillPage',
    });
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
            onClick={() => id && dispatch(fetchUserProfileById({ 
              userId: Number(id), 
              isAuthenticated
            }))} 
          />
        </div>
      </div>
    );
  }

  // Проверяем, свой ли это профиль
  const isOwnProfile = authUser?.id?.toString() === id;

  // Формируем данные навыка
  const skillImages = formattedUser.photosOnAbout && formattedUser.photosOnAbout.length > 0
    ? formattedUser.photosOnAbout
    : getDefaultImages();

  const skill: ISkillData = {
    id: `${formattedUser.id}-teaching`,
    title: formattedUser.teachingSkill.title,
    categories: formattedUser.learningSkills.map(s => s.title).slice(0, 3),
    description: formattedUser.about || `Пользователь ${formattedUser.name} готов поделиться своими знаниями и навыками.`,
    images: skillImages
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Левая колонка - Карточка пользователя */}
        <div className={styles.leftColumn}>
          <UserProfileCard
            user={formattedUser}
            showFavorite={!isOwnProfile} // Не показываем избранное на своём профиле
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>

        {/* Правая колонка - Карточка навыка */}
        <div className={styles.rightColumn}>
          <SkillCard
            skill={skill}
            proposeExchange={
              !isOwnProfile ? ( // Не показываем кнопку на своём профиле
                <ButtonUI
                  title="Предложить обмен"
                  variant="primary"
                  className={styles.exchangeButton}
                  onClick={handleProposeExchange}
                />
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SkillPage;
