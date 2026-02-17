import { getCookie, setCookie } from '../features/auth/cookie';
import type { TUser } from '../entities/User.ts';

const API_KEY = import.meta.env.VITE_API_KEY;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
  data: T;
};

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
    .then((res) =>
      checkResponse<
        TServerResponse<{ refreshToken: string; accessToken: string }>
      >(res),
    )
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.data.refreshToken);
      setCookie('accessToken', refreshData.data.accessToken);
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
          refreshData.data.accessToken;
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

type TAuthResponse = {
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<TAuthResponse>>(res))
    .then((response) => {
      if (response?.success) return response.data;
      return Promise.reject(response);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<TAuthResponse>>(res))
    .then((response) => {
      if (response?.success) return response.data;
      return Promise.reject(response);
    });

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
    .then((response) => {
      if (response?.success) return response.data;
      return Promise.reject(response);
    });

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
    .then((response) => {
      if (response?.success) return response.data;
      return Promise.reject(response);
    });

export const getUserApi = (): Promise<{ user: TUser }> =>
  fetchWithRefresh<TServerResponse<{ user: TUser }>>(`/api/auth/user`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  }).then((response) => response.data);

export const updateUserApi = (
  user: Partial<TRegisterData>,
): Promise<{ user: TUser }> =>
  fetchWithRefresh<TServerResponse<{ user: TUser }>>(`/api/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(user),
  }).then((response) => response.data);

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
    .then((response) => response.data);

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
    .then((response) => response.data);

export const getCitiesApi = (): Promise<string[]> =>
  fetch(`/api/static/cities`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  })
    .then((res) => checkResponse<TServerResponse<string[]>>(res))
    .then((response) => response.data);

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
  createdAt?: Date;
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
    .then((response) => response.data);

// Get specific profile by ID
export const getProfileByIdApi = (id: number): Promise<TProfile> =>
  fetch(`/api/profiles/${id}`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
    },
  })
    .then((res) => checkResponse<TServerResponse<TProfile>>(res))
    .then((response) => response.data);

// Если авторизован - с токеном (для отображения избранного)
export const getProfilesAuthApi = (): Promise<TProfile[]> =>
  fetchWithRefresh<TServerResponse<TProfile[]>>(`/api/profiles`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  }).then((response) => response.data);

export const getProfileByIdAuthApi = (id: number): Promise<TProfile> =>
  fetchWithRefresh<TServerResponse<TProfile>>(`/api/profiles/${id}`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  }).then((response) => response.data);

// Get current user's profile
export const getMyProfileApi = (): Promise<TProfile> =>
  fetchWithRefresh<TServerResponse<TProfile>>(`/api/profiles/me`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  }).then((response) => response.data);

// Update current user's profile
export const updateMyProfileApi = (
  data: TUpdateProfileData,
): Promise<TProfile> =>
  fetchWithRefresh<TServerResponse<TProfile>>(`/api/profiles/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(data),
  }).then((response) => response.data);

// ============================================
// FAVOURITES API
// ============================================

// Get user's favourites
export const getFavouritesApi = (): Promise<TProfile[]> =>
  fetchWithRefresh<TServerResponse<TProfile[]>>(`/api/profiles/favourites`, {
    headers: {
      'X-API-Key': `${API_KEY}`,
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  }).then((response) => response.data);

// Add user to favourites
export const addToFavouritesApi = (userId: number): Promise<object> =>
  fetchWithRefresh<TServerResponse<object>>(
    `/api/profiles/favourites/${userId}`,
    {
      method: 'POST',
      headers: {
        'X-API-Key': `${API_KEY}`,
        authorization: getCookie('accessToken'),
      } as HeadersInit,
    },
  ).then((response) => response.data);

// Remove user from favourites
export const removeFromFavouritesApi = (userId: number): Promise<object> =>
  fetchWithRefresh<TServerResponse<object>>(
    `/api/profiles/favourites/${userId}`,
    {
      method: 'DELETE',
      headers: {
        'X-API-Key': `${API_KEY}`,
        authorization: getCookie('accessToken'),
      } as HeadersInit,
    },
  ).then((response) => response.data);
