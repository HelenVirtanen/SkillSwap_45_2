import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@app/store/store';

export interface City {
  id: number;
  name: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  subcategories: {
    id: number;
    title: string;
  }[];
}

interface StaticDataState {
  cities: City[];
  categories: SkillCategory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const initialState: StaticDataState = {
  cities: [],
  categories: [],
  status: 'idle',
  error: null,
};

// Thunk для загрузки городов
export const fetchCities = createAsyncThunk(
  'static/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db/cities.json');
      if (!response.ok) throw new Error('Ошибка загрузки городов');
      const data = await response.json();
      return data.cities || data || []; // подстраивайся под структуру файла
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk для загрузки категорий и подкатегорий
export const fetchCategories = createAsyncThunk(
  'static/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db/skills.json');
      if (!response.ok) throw new Error('Ошибка загрузки категорий');
      const data = await response.json();
      return data || []; // массив категорий
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const staticDataSlice = createSlice({
  name: 'staticData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Загрузка городов
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Загрузка категорий
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default staticDataSlice.reducer;

// Селекторы
export const selectCities = (state: RootState) => state.staticData.cities;
export const selectCategories = (state: RootState) => state.staticData.categories;
export const selectStaticStatus = (state: RootState) => state.staticData.status;