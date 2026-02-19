import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import {
  openConfirmOfferModal,
  openOfferCreatedModal,
  openOfferSentModal,
  closeModal,
  ModalType,
  ModalData,
} from '@app/store/slices/modals/modalsSlice';

export const useModals = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector((state) => state.modals?.activeModal);
  const modalData = useAppSelector((state) => state.modals?.modalData);

  const openConfirmOffer = useCallback((data: ModalData) => {
    dispatch(openConfirmOfferModal(data));
  }, [dispatch]);

  const openOfferCreated = useCallback((data: ModalData) => {
    dispatch(openOfferCreatedModal(data));
  }, [dispatch]);

  const openOfferSent = useCallback((data: ModalData) => {
    dispatch(openOfferSentModal(data));
  }, [dispatch]);

  const closeCurrentModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return {
    activeModal,
    modalData,
    openConfirmOffer,
    openOfferCreated,
    openOfferSent,
    closeCurrentModal,
    isModalOpen: (type: ModalType) => activeModal === type,
  };
};