import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategory } from '@entities/Skills.ts';
import { getSkillsApi } from '@api/api.ts';

export type FiltersState = {
  skills: TCategory[];
  cities: string[];
  selectedSkills: string[];
  selectedCities: string[];
  selectedGender: string;
  selectedTeachStatus: string;
  isLoading: boolean;
};

const initialState: FiltersState = {
  skills: [],
  cities: [],
  selectedSkills: [],
  selectedCities: [],
  selectedGender: 'any',
  selectedTeachStatus: 'all',
  isLoading: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    clearFilters(state) {
      state.selectedSkills = [];
      state.selectedCities = [];
      state.selectedGender = 'any';
      state.selectedTeachStatus = 'all';
    },
    addToSelectedSkills(state, action) {
      state.selectedSkills.push({
        ...action.payload
      });
    },
  },
  selectors: {
    getSkills: (state) => state.skills,
    getCities: (state) => state.cities,
    getSelectedSkills: (state) => state.selectedSkills,
    getSelectedCities: (state) => state.selectedCities,
    getSelectedGender: (state) => state.selectedGender,
    getSelectedTeachStatus: (state) => state.selectedTeachStatus,
    isLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSkills.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        fetchSkills.fulfilled,
        (state, action: PayloadAction<TCategory[]>) => {
          state.skills = action.payload;
          state.isLoading = false;
        },
      );
  },
});

export const fetchSkills = createAsyncThunk('skills/getAll', async () =>
  getSkillsApi(),
);

export const { getSkills, getSelectedSkills, isLoading } = filtersSlice.selectors;
export const { clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;