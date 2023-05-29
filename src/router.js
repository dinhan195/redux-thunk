/** @format */

import { createBrowserRouter } from 'react-router-dom';
import UserManager from './features/Practice-3/UserManager';
import TodoList from './features/Exercise-1/TodoList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserManager />,
  },
  {
    path: '/exercise-1',
    element: <TodoList />,
  },
]);

export default router;
