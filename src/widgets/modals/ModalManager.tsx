import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModals } from '@shared/hooks/useModals';
import { useAppDispatch } from '@app/store/store';
import { addMyProposal } from '@app/store/slices/exchange/exchangeSlice';
import { ModalWrapperUI } from '@shared/ui/ModalWrapperUI/ModalWrapperUI';
import { ModalCreateOffer } from './ModalCreateOffer/ModalCreateOffer';
import { ModalConfirmOffer } from './ModalConfirmOffer/ModalConfirmOffer';

export const ModalManager: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { 
    modalData, 
    closeCurrentModal, 
    isModalOpen,
    openOfferCreated,
  } = useModals();

  const handleConfirmOfferSubmit = () => {
    closeCurrentModal();
    
    const userId = modalData?.userId;
    const returnTo = modalData?.returnTo;
    
    if (returnTo) {
      navigate(returnTo);
    } else {
      navigate(`/skill/${userId}`);
    }
    
    setTimeout(() => {
      if (modalData) {
        openOfferCreated(modalData);
      }
    }, 500);
  };

  const handleOfferCreatedSubmit = () => {
    closeCurrentModal();
  };

  const handleOfferSentSubmit = () => {
    const userId = modalData?.userId;
    
    if (userId) {
      dispatch(addMyProposal({ toUserId: userId }));
    }
    
    closeCurrentModal();
  };

  const handleConfirmOfferEdit = () => {
    closeCurrentModal();
    
    if (modalData?.context === 'registration') {
      navigate('/register/step3', { 
        state: { 
          returnTo: modalData?.returnTo,
          proposeExchange: true,
          targetUserId: modalData?.userId,
          email: localStorage.getItem('registrationEmail') || 'user@example.com',
        }
      });
    } else {
      navigate(`/skill/${modalData?.userId}`);
    }
  };

  return (
    <>
      {isModalOpen('confirmOffer') && (
        <ModalWrapperUI isOpen={true} onClose={closeCurrentModal} size="lg">
          <ModalConfirmOffer
            title="Ваше предложение"
            description="Проверьте данные перед отправкой"
            aboutSkillProps={modalData?.aboutSkillProps!}
            galleryProps={modalData?.galleryProps || { images: [] }}
            onEdit={handleConfirmOfferEdit}
            onConfirm={handleConfirmOfferSubmit}
          />
        </ModalWrapperUI>
      )}

      {isModalOpen('offerCreated') && (
        <ModalWrapperUI isOpen={true} onClose={closeCurrentModal} size="md">
          <ModalCreateOffer
            variant="created"
            onSubmit={handleOfferCreatedSubmit}
          />
        </ModalWrapperUI>
      )}

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