import { getUsers } from "@api/users";
import { deleteCookie, getCookie } from "@features/auth/cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsAuthChecked, setUser } from "./slice";

export const checkUserAuth = createAsyncThunk(
  'users/checkUser',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const res = await getUsers();
        dispatch(setUser(res.user));
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