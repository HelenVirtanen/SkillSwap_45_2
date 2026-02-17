import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategory } from '@entities/Skills.ts';
import { getCitiesApi, getSkillsApi } from '@api/api.ts';
import {
  City,
  SkillCategory,
} from '@app/store/slices/staticData/staticDataSlice.ts';

export type FiltersState = {
  skills: SkillCategory[];
  cities: City[];
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
          state.skills = action.payload.map((category, arrayId) => ({
            id: arrayId,
            title: category.title,
            icon: category.icon,
            subcategories: category.skills.map((skill, subArrayId) => ({
              id: subArrayId,
              title: skill,
            })),
          }));
          state.isLoading = false;
        },
      );
  },
});

export const fetchSkills = createAsyncThunk('skills/getAll', async () =>
  getSkillsApi(),
);

export const fetchCities = createAsyncThunk('cities/getAll', async () =>
  getCitiesApi(),
);

export const { getSkills, getCities, getSelectedSkills, isLoading } = filtersSlice.selectors;
export const { clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;