/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/Practice-3/userSlice';
import todoSlice from '../features/Exercise-1/todoSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: userSlice,
  todos: todoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
