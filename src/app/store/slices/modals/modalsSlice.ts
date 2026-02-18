import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AboutSkillProps } from '@widgets/AboutSkill/AboutSkill';
import type { SkillGalleryProps } from '@widgets/SkillGallery/SkillGallery';

export type ModalType = 'confirmOffer' | 'offerCreated' | 'offerSent' | null;

export interface ModalData {
  userId?: string;
  skillTitle?: string;
  aboutSkillProps?: Omit<AboutSkillProps, 'actions'>;
  galleryProps?: SkillGalleryProps;
  context?: 'registration' | 'skillPage';
  returnTo?: string;
  shouldProposeAfterReturn?: boolean;
}

interface ModalsState {
  activeModal: ModalType;
  modalData: ModalData | null;
}

const initialState: ModalsState = {
  activeModal: null,
  modalData: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openConfirmOfferModal: (state, action: PayloadAction<ModalData>) => {
      state.activeModal = 'confirmOffer';
      state.modalData = action.payload;
    },
    openOfferCreatedModal: (state, action: PayloadAction<ModalData>) => {
      state.activeModal = 'offerCreated';
      state.modalData = action.payload;
    },
    openOfferSentModal: (state, action: PayloadAction<ModalData>) => {
      state.activeModal = 'offerSent';
      state.modalData = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
  },
});

export const {
  openConfirmOfferModal,
  openOfferCreatedModal,
  openOfferSentModal,
  closeModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
