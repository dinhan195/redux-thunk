/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import todoApi from '../../api/todoApi';

const initialState = {
  todos: [],
};

export const getTodosAction = createAsyncThunk(
  'todo/getTodo',
  async (params) => {
    const res = await todoApi.getAllTodo(params);
    return res.data;
  }
);
export const addTodosAction = createAsyncThunk(
  'todo/addTodo',
  async (newTodo) => {
    const res = await todoApi.addTodo(newTodo);
    return res.data;
  }
);
export const deleteTodosAction = createAsyncThunk(
  'todo/deleteTodo',
  async (id, thunkApi) => {
    const res = await todoApi.deleteTodo(id);
    thunkApi.dispatch(getTodosAction());
    return res.data;
  }
);
export const updateTodosAction = createAsyncThunk(
  'todo/updateTodo',
  async (todo) => {
    const res = await todoApi.updateTodo(todo);
    return res.data;
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get todo list ------------------------------------
    builder
      .addCase(getTodosAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodosAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTodosAction.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      });
    // Add new todo ---------------------------------------------
    builder
      .addCase(addTodosAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodosAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTodosAction.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      });

    // Delete todo ----------------------------------------------------
    builder
      .addCase(deleteTodosAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodosAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTodosAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Deleted one todo');
      });

    // Update to do -------------------------------------------------------
    builder
      .addCase(updateTodosAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodosAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTodosAction.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return (todo = action.payload);
          }
          return todo;
        });
      });
  },
});

export const selectTodos = (state) => state.todos.todos;
export default todoSlice.reducer;
