import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../user/interceptor';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

export const addCardToState = createAsyncThunk(
  'todos/addCard',
  async (type, thunkAPI) => {
    return {
      title: '',
      category: 'FAMILY',
      type: type,
      time: Date.now(),
      // time: new Date().toISOString(),
      level: 'Normal',
    };
  },
);

export const deleteNewTodo = createAsyncThunk(
  'todos/deleteNewToto',
  async (_, thunkAPI) => {
    return null;
  },
);

export const addNewCard = createAsyncThunk(
  'todos/addNewCard',
  async (todo, thunkAPI) => {
    try {
      const { data } = await api.post(
        `${BASE_URL}/todos/add`,
        todo,
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const showTodos = createAsyncThunk('todos/get', async (_, thunkAPI) => {
  try {
    const { data } = await api.get(
      `${BASE_URL}/todos/all`,
    );
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const showTodosDone = createAsyncThunk(
  'todos/done',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(
        `${BASE_URL}/todos/completed`,
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const showTodosActive = createAsyncThunk(
  'todos/active',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(
        `${BASE_URL}/todos/active`,
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const addTodo = createAsyncThunk('todo/add', async (todo, thunkAPI) => {
  try {
    const { data } = await api.post(
      `${BASE_URL}/todos/add`,
      todo,
    );
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const changeTodoStatus = createAsyncThunk(
  'todo/changeStatus',
  async ({ id, isActive }, thunkAPI) => {
    try {
      const { data } = await api.patch(
        `${BASE_URL}/todos/status/${id}`,
        { isActive: isActive },
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const changeTodo = createAsyncThunk(
  'todo/change',
  async ({ id, ...item }, thunkAPI) => {
    try {
      const { data } = await api.put(
        `${BASE_URL}/todos/update/${id}`,
        item,
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todo/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(
        `${BASE_URL}/todos/remove/${id}`,
        id,
      );
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
