import { getCookie, setCookie } from '../features/auth/cookie.ts';
import type { TUser } from '../entities/User.ts';

const API_KEY = import.meta.env.VITE_API_KEY;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
  data: T;
};

// Вспомогательная функция для распаковки data
const unwrapData = <T>(response: TServerResponse<T>): T => {
  if (!response.success) {
    return Promise.reject(response) as T;
  }
  return response.data;
};

type TRefreshData = {
  refreshToken: string;
  accessToken: string;
};

export const refreshToken = (): Promise<TRefreshData> =>
  fetch(`/api/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then((res) => checkResponse<TServerResponse<TRefreshData>>(res))
    .then(unwrapData)
    .then((refreshData) => {
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit,
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<TServerResponse<T>>(res).then(unwrapData);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<TServerResponse<T>>(res).then(unwrapData);
    } else {
      return Promise.reject(err);
    }
  }
};

// ============================================
// AUTH TYPES & API
// ============================================

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthData = {
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export const registerUserApi = (data: TRegisterData): Promise<TAuthData> =>
  fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<TAuthData>>(res))
    .then(unwrapData);

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData): Promise<TAuthData> =>
  fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<TAuthData>>(res))
    .then(unwrapData);

export const forgotPasswordApi = (data: { email: string }): Promise<object> =>
  fetch(`/api/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<object>>(res))
    .then(unwrapData);

export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<object> =>
  fetch(`/api/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<object>>(res))
    .then(unwrapData);

type TUserData = { user: TUser };

export const getUserApi = (): Promise<TUserData> =>
  fetchWithRefresh<TUserData>(`/api/auth/user`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

export const updateUserApi = (
  user: Partial<TRegisterData>,
): Promise<TUserData> =>
  fetchWithRefresh<TUserData>(`/api/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(user),
  });

export const logoutApi = (): Promise<object> =>
  fetch(`/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then((res) => checkResponse<TServerResponse<object>>(res))
    .then(unwrapData);

// ============================================
// STATIC DATA TYPES & API
// ============================================

export type TSkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

export const getSkillsApi = (): Promise<TSkillCategory[]> =>
  fetch(`/api/static/skills`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  })
    .then((res) => checkResponse<TServerResponse<TSkillCategory[]>>(res))
    .then(unwrapData);

export const getCitiesApi = (): Promise<string[]> =>
  fetch(`/api/static/cities`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  })
    .then((res) => checkResponse<TServerResponse<string[]>>(res))
    .then(unwrapData);

// ============================================
// PROFILE TYPES & API
// ============================================

export type TTeachSkills = {
  title: string;
  skills: string;
};

export type TProfile = {
  id: number;
  name: string;
  email: string;
  city?: string;
  birthDate?: string;
  gender?: string;
  teach_skills?: TTeachSkills;
  learn_skills?: string[];
  avatar?: string;
  about?: string;
  photosOnAbout?: string[];
  isFavourite?: boolean;
  favouritesCount?: number;
};

export type TUpdateProfileData = {
  name?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  teachSkillsTitle?: string;
  teachSkills?: string;
  learnSkills?: string[];
  avatar?: string;
  about?: string;
  photosOnAbout?: string[];
};

// Get all profiles
export const getProfilesApi = (): Promise<TProfile[]> =>
  fetch(`/api/profiles`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  })
    .then((res) => checkResponse<TServerResponse<TProfile[]>>(res))
    .then(unwrapData);

// Get specific profile by ID
export const getProfileByIdApi = (id: number): Promise<TProfile> =>
  fetch(`/api/profiles/${id}`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  })
    .then((res) => checkResponse<TServerResponse<TProfile>>(res))
    .then(unwrapData);

// Если авторизован - с токеном (для отображения избранного)
export const getProfilesAuthApi = (): Promise<TProfile[]> =>
  fetchWithRefresh<TProfile[]>(`/api/profiles`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

export const getProfileByIdAuthApi = (id: number): Promise<TProfile> =>
  fetchWithRefresh<TProfile>(`/api/profiles/${id}`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Get current user's profile
export const getMyProfileApi = (): Promise<TProfile> =>
  fetchWithRefresh<TProfile>(`/api/profiles/me`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Update current user's profile
export const updateMyProfileApi = (
  data: TUpdateProfileData,
): Promise<TProfile> =>
  fetchWithRefresh<TProfile>(`/api/profiles/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(data),
  });

// ============================================
// FAVOURITES API
// ============================================

// Get user's favourites
export const getFavouritesApi = (): Promise<TProfile[]> =>
  fetchWithRefresh<TProfile[]>(`/api/profiles/favourites`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Add user to favourites
export const addToFavouritesApi = (userId: number): Promise<object> =>
  fetchWithRefresh<object>(`/api/profiles/favourites/${userId}`, {
    method: 'POST',
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Remove user from favourites
export const removeFromFavouritesApi = (userId: number): Promise<object> =>
  fetchWithRefresh<object>(`/api/profiles/favourites/${userId}`, {
    method: 'DELETE',
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });
