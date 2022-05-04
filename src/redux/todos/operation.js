import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import api from '../user/interceptor';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlaWtpdi5hbm5AZ21haWwuY29tIiwiaWQiOiI2MWZlNmFlYjExZWE4NmY3NGJiN2IyYWUiLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaWF0IjoxNjQ0MDYzNTM1LCJleHAiOjE2NDQwNjUzMzV9.sJ05yntv8QQ5GgctYXX2ZbhppF_dd4XLmE5ZxcigGZs`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

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
        `http://questify-project.herokuapp.com/api/todos/add`,
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
      `http://questify-project.herokuapp.com/api/todos/all`,
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
        `http://questify-project.herokuapp.com/api/todos/completed`,
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
        `http://questify-project.herokuapp.com/api/todos/active`,
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
      `http://questify-project.herokuapp.com/api/todos/add`,
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
        `http://questify-project.herokuapp.com/api/todos/status/${id}`,
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
        `http://questify-project.herokuapp.com/api/todos/update/${id}`,
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
      const { data } = await api.delete(
        `http://questify-project.herokuapp.com/api/todos/remove/${id}`,
        id,
      );
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
