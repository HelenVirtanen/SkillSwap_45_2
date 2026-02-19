import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app/store/store';

export interface ExchangeProposal {
  id: string;
  fromUserId: number;
  toUserId: number;
  skillId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface ExchangeState {
  myProposals: Record<string, boolean>; // { "toUserId": true } - кому текущий пользователь предложил обмен
  proposalsToMe: Record<string, boolean>; // { "fromUserId": true } - кто предложил обмен текущему пользователю
  loading: boolean;
  error: string | null;
}

const initialState: ExchangeState = {
  myProposals: {},
  proposalsToMe: {},
  loading: false,
  error: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    // Добавить предложение обмена (текущий пользователь предлагает кому-то)
    addMyProposal: (state, action: PayloadAction<{ toUserId: string | number }>) => {
      const userId = String(action.payload.toUserId);
      console.log('✅ Adding MY proposal to user:', userId);
      state.myProposals[userId] = true;
      
      // Сохраняем в localStorage
      localStorage.setItem('myExchangeProposals', JSON.stringify(state.myProposals));
    },
    
    // Добавить предложение обмена (кто-то предлагает текущему пользователю)
    addProposalToMe: (state, action: PayloadAction<{ fromUserId: string | number }>) => {
      const userId = String(action.payload.fromUserId);
      console.log('📩 Adding proposal TO ME from user:', userId);
      state.proposalsToMe[userId] = true;
      
      // Сохраняем в localStorage
      localStorage.setItem('proposalsToMe', JSON.stringify(state.proposalsToMe));
    },
    
    // Загрузить мои предложения из localStorage
    loadMyProposals: (state) => {
      const saved = localStorage.getItem('myExchangeProposals');
      if (saved) {
        try {
          state.myProposals = JSON.parse(saved);
          console.log('📦 Loaded MY proposals:', state.myProposals);
        } catch (e) {
          console.error('Error loading my proposals', e);
        }
      }
    },
    
    // Загрузить предложения ко мне из localStorage
    loadProposalsToMe: (state) => {
      const saved = localStorage.getItem('proposalsToMe');
      if (saved) {
        try {
          state.proposalsToMe = JSON.parse(saved);
          console.log('📦 Loaded proposals TO ME:', state.proposalsToMe);
        } catch (e) {
          console.error('Error loading proposals to me', e);
        }
      }
    },
    
    // Очистить все предложения (при логауте)
    clearAllProposals: (state) => {
      state.myProposals = {};
      state.proposalsToMe = {};
      localStorage.removeItem('myExchangeProposals');
      localStorage.removeItem('proposalsToMe');
    },
  },
});

export const { 
  addMyProposal, 
  addProposalToMe,
  loadMyProposals,
  loadProposalsToMe,
  clearAllProposals 
} = exchangeSlice.actions;

// Селекторы
export const selectHasProposedToUser = (state: RootState, userId: string | number) => {
  const hasProposed = state.exchange.myProposals[String(userId)] || false;
  console.log(`🔍 Checking if I proposed to user ${userId}:`, hasProposed);
  return hasProposed;
};

export const selectHasProposedFromUser = (state: RootState, userId: string | number) => {
  const hasProposed = state.exchange.proposalsToMe[String(userId)] || false;
  console.log(`🔍 Checking if user ${userId} proposed to me:`, hasProposed);
  return hasProposed;
};

export const selectAllMyProposals = (state: RootState) => 
  state.exchange.myProposals;

export const selectAllProposalsToMe = (state: RootState) => 
  state.exchange.proposalsToMe;

export default exchangeSlice.reducer;