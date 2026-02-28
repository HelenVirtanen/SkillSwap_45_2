import { getUsers } from "@api/users";
import { deleteCookie, getCookie } from "@features/auth/cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsAuthChecked, setUser } from "./auth";
import { getUserApi } from "@api/api";

export const checkUserAuth = createAsyncThunk(
  'users/checkUser',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const res = await getUserApi();// после обновлении мтраница авторизация слетала
        dispatch(setUser(res.user));
        dispatch(setIsAuthChecked(true));
      } catch (err) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      }
    }
    dispatch(setIsAuthChecked(true));
  }
); 

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await getUsers();
  return res;
});