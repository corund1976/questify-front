import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from './interceptor';
import { getCookie } from './helper';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const token = {
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
      token.set(data.accessToken);
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
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('isloggedIn', true);

      document.cookie = `refreshToken=${data.refreshToken}`;

      token.set(data.accessToken);
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
      localStorage.removeItem('isloggedIn');

      const token = getCookie('refreshToken');
      const { data } = await api.get(
        `${BASE_URL}/users/logout`,
        {
          withCredentials: true,
          headers: {
            update: `${token}`,
          },
        }
      );
      document.cookie = 'refreshToken=-1;expires=Thu, 01 Jan 1970 00:00:01 GMT';
      // token.unset();
      localStorage.removeItem('token');

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
    console.log('operations.js state =', state);
    const persistedToken = state.user.token;
    console.log('operations.js persistedToken =', persistedToken);

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('User is logged out');
    }

    token.set(persistedToken);

    try {
      const token = getCookie('refreshToken');
      console.log('token = ', token);
      const { data } = await axios.get(
        `${BASE_URL}/users/refresh`,
        {
          withCredentials: true,
          headers: {
            update: `${token}`,
          },
        }
      );
      localStorage.setItem('token', data.accessToken);
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
