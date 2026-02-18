// C:\Users\ispun\OneDrive\Документы\GitHub\SkillSwap_45_2\src\widgets\modals\ModalManager.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModals } from '@shared/hooks/useModals';
import { ModalWrapperUI } from '@shared/ui/ModalWrapperUI/ModalWrapperUI';
import { ModalCreateOffer } from './ModalCreateOffer/ModalCreateOffer';
import { ModalConfirmOffer } from './ModalConfirmOffer/ModalConfirmOffer';

export const ModalManager: React.FC = () => {
  const navigate = useNavigate();
  const { 
    activeModal, 
    modalData, 
    closeCurrentModal, 
    isModalOpen,
    openOfferCreated,
    openOfferSent,
  } = useModals();

  // Обработчик для модалки подтверждения (confirmOffer)
  const handleConfirmOfferSubmit = () => {
    closeCurrentModal();
    // После подтверждения открываем "предложение создано"
    setTimeout(() => {
      if (modalData) {
        openOfferCreated(modalData);
      }
    }, 300);
  };

  // Обработчик для редактирования в модалке подтверждения
  const handleConfirmOfferEdit = () => {
    closeCurrentModal();
    navigate('/register/step3', { 
      state: { 
        returnTo: modalData?.returnTo,
        userId: modalData?.userId,
        shouldProposeAfterReturn: modalData?.shouldProposeAfterReturn 
      }
    });
  };

  // Обработчик для модалки "предложение создано" (offerCreated)
  const handleOfferCreatedSubmit = () => {
    const userId = modalData?.userId;
    const returnTo = modalData?.returnTo;
    const shouldPropose = modalData?.shouldProposeAfterReturn;
    
    closeCurrentModal();
    
    if (returnTo && shouldPropose) {
      // Возвращаемся на страницу навыка с флагом для авто-предложения
      navigate(returnTo, { 
        state: { shouldAutoPropose: true, targetUserId: userId }
      });
    } else if (returnTo) {
      navigate(returnTo);
    } else {
      navigate(`/skill/${userId}`);
    }
  };

  // Обработчик для модалки "предложение отправлено" (offerSent)
  const handleOfferSentSubmit = () => {
    closeCurrentModal();
    // Дополнительная логика после отправки предложения
    console.log('Предложение отправлено');
  };

  return (
    <>
      {/* Модалка подтверждения предложения (после регистрации) */}
      {isModalOpen('confirmOffer') && modalData?.context === 'registration' && (
        <ModalWrapperUI isOpen={true} onClose={closeCurrentModal} size="lg">
          <ModalConfirmOffer
            title="Ваше предложение"
            description="Проверьте данные перед отправкой"
            aboutSkillProps={modalData.aboutSkillProps!}
            galleryProps={modalData.galleryProps || { images: [] }}
            onEdit={handleConfirmOfferEdit}
            onConfirm={handleConfirmOfferSubmit}
          />
        </ModalWrapperUI>
      )}

      {/* Модалка "предложение создано" (после подтверждения) */}
      {isModalOpen('offerCreated') && (
        <ModalWrapperUI isOpen={true} onClose={closeCurrentModal} size="md">
          <ModalCreateOffer
            variant="created"
            onSubmit={handleOfferCreatedSubmit}
          />
        </ModalWrapperUI>
      )}

      {/* Модалка "предложение отправлено" (после авто-предложения или ручного нажатия) */}
      {isModalOpen('offerSent') && (
        <ModalWrapperUI isOpen={true} onClose={closeCurrentModal} size="md">
          <ModalCreateOffer
            variant="sent"
            onSubmit={handleOfferSentSubmit}
          />
        </ModalWrapperUI>
      )}
    </>
  );
};