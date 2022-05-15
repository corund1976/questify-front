import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import api from './interceptor';
import { getCookie } from './helper';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosHeaderAccessToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const userRegistration = createAsyncThunk(
  'auth/registration',
  async ({ host, ...user }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/registration`,
        user,
        {
          withCredentials: true,
          headers: {
            hrmt: `${host}`,
          },
        }
      );
      axiosHeaderAccessToken.set(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ host, ...user }, thunkAPI) => {
    try {
      console.log('operations =>');
      console.log('host', host);
      console.log('user', user);
      const { data } = await axios.post(
        `${BASE_URL}/users/login`,
        user,
        {
          withCredentials: true,
          headers: {
            hrmt: `${host}`,
          },
        }
      );
      console.log('data', data);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userIsLoggedIn', true);
      document.cookie = `refreshToken=${data.refreshToken}`;
      axiosHeaderAccessToken.set(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const refreshTokenFromCookie = getCookie('refreshToken');
      console.log('refreshTokenFromCookie = ', refreshTokenFromCookie);
      const { data } = await api.get(
        `${BASE_URL}/users/logout`,
        {
          withCredentials: true,
          headers: {
            update: `${refreshTokenFromCookie}`,
          },
        }
      );
      document.cookie = 'refreshToken=-1;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      // axiosHeaderAccessToken.unset();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userIsLoggedIn');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// check address
// export const userActivate = createAsyncThunk("auth/activate", async (id) => {
//   try {
//     const { data } = await axios.get(`${BASE_URL}/activate/${id}`, id);
//     return data;
//   } catch (error) {
//     throw new Error(error);
//   }
// });

export const userRefresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    console.log('operations.js userRefresh');
    const state = thunkAPI.getState();
    console.log('operations.js state.user =', state.user);
    const persistedToken = state.user.token;
    console.log('operations.js persistedToken =', persistedToken);

    if (persistedToken === null) {
      console.log('Токена нет, уходим из userRefresh');
      return thunkAPI.rejectWithValue('User is logged out');
    }

    axiosHeaderAccessToken.set(persistedToken);

    try {
      const refreshTokenFromCookie = getCookie('refreshToken');
      console.log('refreshTokenFromCoockie = ', refreshTokenFromCookie);

      const { data } = await axios.get(
        `${BASE_URL}/users/refresh`,
        {
          withCredentials: true,
          headers: {
            update: `${refreshTokenFromCookie}`,
          },
        }
      );
      localStorage.setItem('accessToken', data.accessToken);
      document.cookie = `refreshToken=${data.refreshToken}`;
      console.log('document.cookie', document.cookie);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


// export const userResetPassword = createAsyncThunk(
//   "auth/reset-password",
//   async (user) => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/reset-password`, user);
//       return data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// );

// export const userChangePassword = createAsyncThunk("auth/change-password", async (user) => {
//   try {
//     const { data } = await axios.get(`${BASE_URL}/change-password`, user);
//     return data;
//   } catch (error) {
//     throw new Error(error);
//   }
// });
export const userResetPassword = createAsyncThunk(
  'auth/reset-password',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/reset-password`,
        user
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const userChangePassword = createAsyncThunk(
  'auth/change-password',
  async ({ password, link }, thunkAPI) => {

    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/change-password/${link}`,
        { password }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
