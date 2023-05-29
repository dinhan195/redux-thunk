/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

const initialState = {
  users: [],
};

export const fetchUserAction = createAsyncThunk(
  'user/fetchUser',
  async (params, thunkApi) => {
    const res = await userApi.getAllUser(params);
    return res.data;
  }
);

export const addUserAction = createAsyncThunk(
  'user/addUser',
  async (newUser) => {
    const res = await userApi.addUser(newUser);
    return res.data;
  }
);
export const deleteUserAction = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkApi) => {
    const res = await userApi.deleteUser(id);
    thunkApi.dispatch(fetchUserAction());
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
    builder
      .addCase(addUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      });
    builder
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
