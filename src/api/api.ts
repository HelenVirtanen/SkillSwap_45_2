import { getCookie, setCookie } from '../features/auth/cookie.ts';
import type { TUser } from '../entities/User.ts';

const URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
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
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
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
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
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

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`/api/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<object>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`/api/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<object>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`/api/auth/user`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`/api/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(user),
  });

export const logoutApi = () =>
  fetch(`/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((res) => checkResponse<TServerResponse<object>>(res));

// ============================================
// STATIC DATA TYPES & API
// ============================================

export type TSkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

type TSkillsResponse = TServerResponse<TSkillCategory[]>;
type TCitiesResponse = TServerResponse<string[]>;

export const getSkillsApi = () =>
  fetch(`/api/static/skills`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  }).then((res) => checkResponse<TSkillsResponse>(res));

export const getCitiesApi = () =>
  fetch(`/api/static/cities`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  }).then((res) => checkResponse<TCitiesResponse>(res));

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

export type TProfileResponse = TServerResponse<TProfile>;
export type TProfilesResponse = TServerResponse<TProfile[]>;

// Get all profiles
export const getProfilesApi = () =>
  fetch(`/api/profiles`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  }).then((res) => checkResponse<TProfilesResponse>(res));

// Get specific profile by ID
export const getProfileByIdApi = (id: number) =>
  fetch(`/api/profiles/${id}`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  }).then((res) => checkResponse<TProfileResponse>(res));

// Если авторизован - с токеном (для отображения избранного)
export const getProfilesAuthApi = () =>
  fetchWithRefresh<TProfilesResponse>(`/api/profiles`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

export const getProfileByIdAuthApi = (id: number) =>
  fetchWithRefresh<TProfileResponse>(`/api/profiles/${id}`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Get current user's profile
export const getMyProfileApi = () =>
  fetchWithRefresh<TProfileResponse>(`/api/profiles/me`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Update current user's profile
export const updateMyProfileApi = (data: TUpdateProfileData) =>
  fetchWithRefresh<TProfileResponse>(`/api/profiles/me`, {
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
export const getFavouritesApi = () =>
  fetchWithRefresh<TProfilesResponse>(`/api/profiles/favourites`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Add user to favourites
export const addToFavouritesApi = (userId: number) =>
  fetchWithRefresh<TServerResponse<object>>(`/api/profiles/favourites/${userId}`, {
    method: 'POST',
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

// Remove user from favourites
export const removeFromFavouritesApi = (userId: number) =>
  fetchWithRefresh<TServerResponse<object>>(`/api/profiles/favourites/${userId}`, {
    method: 'DELETE',
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });