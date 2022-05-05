import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from './interceptor';
import { get_cookie } from './helper';

// const BASE_URL = 'https://questify-back.herokuapp.com/api';
const BASE_URL = 'http://localhost:3030/api';

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
      console.log('host => ', host);
      console.log('user => ', user);
      console.log('user => ', { ...user });
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
      console.log('data =>', data);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('isloggedIn', true);

      document.cookie = `refreshToken=${data.refreshToken}`;
      console.log('document.cookie', document.cookie);

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

      const token = get_cookie('refreshToken');
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
    const state = thunkAPI.getState();
    const persistedToken = state.user.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('User is logged out');
    }

    token.set(persistedToken);

    try {
      const token = get_cookie('refreshToken');
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
