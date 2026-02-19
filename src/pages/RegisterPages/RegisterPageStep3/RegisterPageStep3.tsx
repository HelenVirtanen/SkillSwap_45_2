import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModals } from '@shared/hooks/useModals';
import { useAppDispatch } from '@app/store/store';
import { setUser, setIsAuthChecked } from '@app/store/slices/authUser/auth';
import { setCookie } from '@features/auth/cookie';

import Stepper from '@widgets/Stepper/Stepper';
import { Step3SkillInfo, Step3Data } from '@features/forms/RegisterSteps/Step3SkillInfo/Step3SkillInfo';
import { IllustrationPanel } from '@widgets/IllustrationPanel/IllustrationPanel';

import SkillImage from '@assets/illustrations/school-board.svg?react';

import styles from './RegisterPageStep3.module.css';

const RegisterPageStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { openConfirmOffer } = useModals();

  // Получаем все данные из предыдущих шагов
  const { 
    email, 
    password, 
    firstName, 
    birthDate, 
    gender, 
    city,
    returnTo,
    proposeExchange,
    targetUserId,
    title,
    category,
    subcategory,
    description,
    image
  } = location.state || {};

  // Проверяем наличие email при загрузке компонента
  useEffect(() => {
    if (!email) {
      console.log('No email found in RegisterPageStep3');
      const savedData = localStorage.getItem('registrationData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.email) {
            console.log('Found email in localStorage');
            return;
          }
        } catch (e) {
          console.error('Error parsing localStorage data', e);
        }
      }
      navigate('/register/step1');
    }
  }, [email, navigate]);

  const handleBack = () => {
    navigate('/register/step2', { 
      state: { 
        email, 
        password,
        firstName,
        birthDate,
        gender,
        city,
        returnTo,
        proposeExchange,
        targetUserId 
      } 
    });
  };

  // Функция для имитации успешной регистрации
  const completeRegistration = () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 10,
      name: firstName || email?.split('@')[0] || 'Пользователь',
      email: email || '',
      city: city || '',
    };

    const fakeAccessToken = 'fake_access_token_' + Date.now();
    const fakeRefreshToken = 'fake_refresh_token_' + Date.now();
    
    localStorage.setItem('refreshToken', fakeRefreshToken);
    setCookie('accessToken', fakeAccessToken);
    
    dispatch(setUser(newUser));
    dispatch(setIsAuthChecked(true));
    
    console.log('✅ User registered and authenticated:', newUser);
    
    return newUser;
  };

  const handleNext = (skillData: Step3Data) => {
    try {
      console.log('✅ Полные данные регистрации:', {
        email,
        password,
        name: firstName || email?.split('@')[0] || 'Пользователь',
        birthDate,
        gender,
        city,
        skill: {
          title: skillData.title,
          category: skillData.category,
          subcategory: skillData.subcategory,
          description: skillData.description,
          image: skillData.image ? skillData.image.name : 'No image'
        }
      });

      // Выполняем регистрацию пользователя
      completeRegistration();

      // Очищаем localStorage
      localStorage.removeItem('registrationData');

      // Проверяем, нужно ли предложить обмен
      if (proposeExchange && targetUserId) {
        console.log('🔄 Opening confirm offer modal');
        
        // Открываем модалку подтверждения предложения
        openConfirmOffer({
          userId: targetUserId,
          returnTo: returnTo || `/skill/${targetUserId}`,
          context: 'registration',
          shouldProposeAfterReturn: true,
          aboutSkillProps: {
            title: skillData.title,
            category: skillData.category[0] || 'Категория',
            subcategory: skillData.subcategory[0] || 'Подкатегория',
            description: skillData.description,
          },
          galleryProps: {
            images: skillData.image ? [URL.createObjectURL(skillData.image)] : ['/assets/illustrations/drumming-main.png'],
          },
        });
      } else {
        // Если не нужно предлагать обмен, переходим на главную
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка при завершении регистрации:', error);
    }
  };

  // Подготовка начальных данных для шага 3
  const initialStep3Data: Partial<Step3Data> = {
    title: title || '',
    category: category || [],
    subcategory: subcategory || [],
    description: description || '',
    image: image || undefined,
  };

  return (
    <div className={styles.page}>
      <Stepper currentStep={3} />

      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Step3SkillInfo 
            onBack={handleBack} 
            onNext={handleNext}
            initialData={initialStep3Data}
          />
        </div>

        <div className={styles.right}>
          <IllustrationPanel
            image={<SkillImage />}
            title="Укажите, чем вы готовы поделиться"
            description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPageStep3;