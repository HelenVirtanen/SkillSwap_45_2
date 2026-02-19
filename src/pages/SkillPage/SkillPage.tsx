import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
import { 
  selectHasProposedToUser, 
  loadMyProposals,
} from '@app/store/slices/exchange/exchangeSlice';
import UserProfileCard from '@widgets/UserProfileCard/UserProfileCard';
import SkillCard from '@widgets/SkillCard/SkillCard';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import Loader from '@shared/ui/Loader/Loader';
import styles from './SkillPage.module.css';

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
  
  const { 
    openConfirmOffer,
    openOfferSent,
  } = useModals();
  
  // Загружаем мои предложения обмена из localStorage при монтировании
  useEffect(() => {
    dispatch(loadMyProposals());
  }, [dispatch]);

  const state = location.state as { 
    proposeExchange?: boolean; 
    targetUserId?: string;
    from?: string;
    shouldAutoPropose?: boolean;
  } | null;
  
  const userData = useAppSelector(selectCurrentProfileUser);
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileError);
  
  const authUser = useAppSelector(selectAuthUser);
  const isAuthenticated = !!authUser;
  
  // Проверяем, предлагали ли уже обмен этому пользователю
  const hasProposedToThisUser = useAppSelector((state) => 
    id ? selectHasProposedToUser(state, id) : false
  );

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

  // Открываем модалку подтверждения после регистрации
  useEffect(() => {
    if (state?.proposeExchange && 
        state?.targetUserId === id && 
        isAuthenticated && 
        formattedUser && 
        formattedUser.id !== authUser?.id?.toString() &&
        !hasProposedToThisUser) {
      
      openConfirmOffer({
        userId: id,
        skillTitle: formattedUser.teachingSkill.title,
        context: 'skillPage',
        aboutSkillProps: {
          title: formattedUser.teachingSkill.title,
          category: formattedUser.learningSkills[0]?.title || 'Категория',
          subcategory: formattedUser.teachingSkill.title,
          description: formattedUser.about || 'Описание навыка',
        },
        galleryProps: {
          images: formattedUser.photosOnAbout?.length ? 
            formattedUser.photosOnAbout : 
            getDefaultImages(),
        },
        returnTo: `/skill/${id}`,
      });
      
      navigate(`/skill/${id}`, { replace: true, state: {} });
    }
  }, [state, id, isAuthenticated, formattedUser, authUser, openConfirmOffer, navigate, hasProposedToThisUser]);

  const handleProposeExchange = () => {
    if (!formattedUser) return;
    
    // Нельзя предложить обмен самому себе
    if (authUser?.id?.toString() === id) {
      return;
    }
    
    // Неавторизованный пользователь -> регистрация
    if (!isAuthenticated) {
      navigate('/register/step1', { 
        state: { 
          returnTo: `/skill/${id}`,
          proposeExchange: true,
          targetUserId: id 
        }
      });
      return;
    }
    
    // Уже предлагали обмен
    if (hasProposedToThisUser) {
      alert('Вы уже предложили обмен этому пользователю');
      return;
    }
    
    // Открываем модалку "Вы предложили обмен"
    openOfferSent({
      userId: id,
      skillTitle: formattedUser.teachingSkill.title,
      context: 'skillPage',
      aboutSkillProps: {
        title: formattedUser.teachingSkill.title,
        category: formattedUser.learningSkills[0]?.title || 'Категория',
        subcategory: formattedUser.teachingSkill.title,
        description: formattedUser.about || 'Описание навыка',
      },
      galleryProps: {
        images: formattedUser.photosOnAbout?.length ? 
          formattedUser.photosOnAbout : 
          getDefaultImages(),
      },
      returnTo: `/skill/${id}`,
    });
  };

  const handleFavoriteToggle = (userId: string) => {
    dispatch(toggleFavoriteInProfile(userId));
  };

  if (status === 'loading') {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
        <p className={styles.loaderText}>Загрузка профиля пользователя...</p>
      </div>
    );
  }

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

  const isOwnProfile = authUser?.id?.toString() === id;

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

  const getButtonText = () => {
    if (!isAuthenticated) return 'Предложить обмен';
    if (isOwnProfile) return 'Это ваш профиль';
    if (hasProposedToThisUser) return 'Обмен предложен';
    return 'Предложить обмен';
  };

  const isButtonDisabled = () => {
    if (!isAuthenticated) return false;
    if (isOwnProfile) return true;
    if (hasProposedToThisUser) return true;
    return false;
  };

  const getButtonVariant = () => {
    if (!isAuthenticated) return "primary";
    if (hasProposedToThisUser) return "secondary";
    return "primary";
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <UserProfileCard
            user={formattedUser}
            showFavorite={!isOwnProfile}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>

        <div className={styles.rightColumn}>
          <SkillCard
            skill={skill}
            proposeExchange={
              !isOwnProfile ? (
                <ButtonUI
                  title={getButtonText()}
                  variant={getButtonVariant()}
                  className={`${styles.exchangeButton} ${isButtonDisabled() ? styles.buttonDisabled : ''}`}
                  onClick={handleProposeExchange}
                  disabled={isButtonDisabled()}
                />
              ) : (
                <ButtonUI
                  title="Это ваш профиль"
                  variant="secondary"
                  className={styles.exchangeButton}
                  disabled={true}
                />
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SkillPage;