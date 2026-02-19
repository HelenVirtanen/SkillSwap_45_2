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
// Импорты для related-block
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import UserCard from '@widgets/UserCard/UserCard';
import ChevronLeftIcon from '@assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@assets/icons/chevron-right.svg?react';
import { selectAllUsers } from '@app/store/slices/User/usersSlise';
import { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
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

interface IRelatedUser extends IUserCardData {
  relevanceScore: number;
  matchType: 'sameTeacher' | 'wantsToLearnFromCurrent' | 'sameLearner' | 'canTeachCurrent';
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
  
  // Состояния для related-block
  const [relatedUsers, setRelatedUsers] = useState<IUserCardData[]>([]);
  const [isRelatedLoading, setIsRelatedLoading] = useState(false);
  
  // Загружаем мои предложения обмена
  useEffect(() => {
    dispatch(loadMyProposals());
  }, [dispatch]);

  const state = location.state as { 
    proposeExchange?: boolean; 
    targetUserId?: string;
    from?: string;
    shouldAutoPropose?: boolean; // Восстанавливаем поле
  } | null;
  
  const userData = useAppSelector(selectCurrentProfileUser);
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileError);
  
  const authUser = useAppSelector(selectAuthUser);
  const isAuthenticated = !!authUser;
  
  // Получаем всех пользователей для related-block
  const allUsers = useAppSelector(selectAllUsers);
  
  // Проверяем, предлагали ли уже обмен
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

  // ВОССТАНАВЛИВАЕМ: Эффект для автоматического открытия модалки после регистрации
  useEffect(() => {
    if (state?.shouldAutoPropose && 
        state?.targetUserId === id && 
        isAuthenticated && 
        formattedUser && 
        formattedUser.id !== authUser?.id?.toString()) {
      
      // Небольшая задержка для загрузки всех данных
      setTimeout(() => {
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
      }, 500);
      
      // Очищаем state
      navigate(`/skill/${id}`, { replace: true, state: {} });
    }
  }, [state, id, isAuthenticated, formattedUser, authUser, openOfferSent, navigate]);

  // Оставляем эффект для предложения после регистрации (через confirm)
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

  // Функция для расчета релевантности (для related-block)
  const getRelevanceScore = (
    user: any,
    currentTeachingSkill: string,
    currentLearningSkills: string[]
  ): { score: number; matchType: IRelatedUser['matchType'] } => {
    const userTeachingSkill = user.teach_skills?.skills || '';
    const userLearningSkills = user.learn_skills || [];
    
    if (userTeachingSkill === currentTeachingSkill) {
      return { score: 4, matchType: 'sameTeacher' };
    }
    
    if (userLearningSkills.some((skill: string) => skill === currentTeachingSkill)) {
      return { score: 3, matchType: 'wantsToLearnFromCurrent' };
    }
    
    if (currentLearningSkills.includes(userTeachingSkill)) {
      return { score: 2, matchType: 'canTeachCurrent' };
    }
    
    if (userLearningSkills.some((skill: string) => currentLearningSkills.includes(skill))) {
      return { score: 1, matchType: 'sameLearner' };
    }
    
    return { score: 0, matchType: 'sameLearner' };
  };

  // Эффект для поиска похожих пользователей
  useEffect(() => {
    if (!formattedUser || !allUsers.length) {
      setRelatedUsers([]);
      return;
    }

    setIsRelatedLoading(true);

    const findRelatedUsers = () => {
      const otherUsers = allUsers.filter(user => user.id.toString() !== id);
      
      const currentTeachingSkill = formattedUser.teachingSkill.title;
      const currentLearningSkills = formattedUser.learningSkills.map(s => s.title);
      
      const usersWithScores = otherUsers
        .map(user => {
          const { score, matchType } = getRelevanceScore(
            user,
            currentTeachingSkill,
            currentLearningSkills
          );
          
          if (score === 0) return null;
          
          const teachingSkill = {
            title: user.teach_skills?.skills || 'Навык не указан',
            variant: determineSkillVariant(user.teach_skills?.skills || '')
          };
          
          const learningSkills = (user.learn_skills || []).map((skill: string) => ({
            title: skill,
            variant: determineSkillVariant(skill)
          }));
          
          const relatedUser: IRelatedUser = {
            id: user.id.toString(),
            avatar: user.avatar || '/avatars/user-photo.png',
            name: user.name || 'Пользователь',
            birthDate: user.birthDate || '2000-01-01',
            city: user.city || 'Город не указан',
            teachingSkill: {
              title: teachingSkill.title,
              variant: teachingSkill.variant as ISkill['variant']
            },
            learningSkills: learningSkills.map(skill => ({
              title: skill.title,
              variant: skill.variant as ISkill['variant']
            })),
            isFavorite: user.isFavourite || false,
            relevanceScore: score,
            matchType
          };
          
          return relatedUser;
        })
        .filter((user): user is IRelatedUser => user !== null);
      
      const sortedUsers = [...usersWithScores].sort((a, b) => b.relevanceScore - a.relevanceScore);
      
      const topUsers: IRelatedUser[] = [];
      const matchTypes = new Set<string>();
      
      for (const user of sortedUsers) {
        if (!matchTypes.has(user.matchType)) {
          topUsers.push(user);
          matchTypes.add(user.matchType);
        }
        if (topUsers.length >= 4) break;
      }
      
      for (const user of sortedUsers) {
        if (!topUsers.find(u => u.id === user.id) && topUsers.length < 8) {
          topUsers.push(user);
        }
      }
      
      setRelatedUsers(topUsers);
      setIsRelatedLoading(false);
    };

    const timer = setTimeout(findRelatedUsers, 300);
    return () => clearTimeout(timer);
  }, [formattedUser, allUsers, id]);

  const handleProposeExchange = () => {
    if (!formattedUser) return;
    
    if (authUser?.id?.toString() === id) {
      return;
    }
    
    if (!isAuthenticated) {
      navigate('/register/step1', { 
        state: { 
          from: `/skill/${id}`, // ВОССТАНАВЛИВАЕМ упрощенную навигацию
          proposeExchange: true,
          targetUserId: id
        }
      });
      return;
    }
    
    if (hasProposedToThisUser) {
      alert('Вы уже предложили обмен этому пользователю');
      return;
    }
    
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

  const handleRelatedUserClick = (userId: string) => {
    navigate(`/skill/${userId}`);
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

      {/* Related Block */}
      {relatedUsers.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Похожие предложения</h2>
          <div className={styles.carouselWrapper}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView="auto"
              navigation={{
                prevEl: `.${styles.prevButton}`,
                nextEl: `.${styles.nextButton}`,
              }}
              className={styles.relatedSwiper}
            >
              {relatedUsers.map((user) => (
                <SwiperSlide key={user.id} className={styles.relatedSlide}>
                  <UserCard
                    id={user.id}
                    avatar={user.avatar}
                    name={user.name}
                    birthDate={user.birthDate}
                    city={user.city}
                    teachingSkill={user.teachingSkill}
                    learningSkills={user.learningSkills}
                    isFavorite={user.isFavorite}
                    onFavoriteToggle={() => handleFavoriteToggle(user.id)}
                    onDetailsClick={handleRelatedUserClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {relatedUsers.length > 4 && (
              <>
                <button className={`${styles.navButton} ${styles.prevButton}`}>
                  <ChevronLeftIcon />
                </button>
                <button className={`${styles.navButton} ${styles.nextButton}`}>
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      {isRelatedLoading && (
        <div className={styles.relatedLoader}>
          <Loader />
          <p className={styles.relatedLoaderText}>Загрузка похожих пользователей...</p>
        </div>
      )}
    </div>
  );
};

export default SkillPage;