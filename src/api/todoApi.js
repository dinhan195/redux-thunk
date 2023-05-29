/** @format */

import axios from 'axios';

const URL = 'http://localhost:3000/todos/';
const todoApi = {
  getAllTodo: async (params) => {
    return await axios.get(URL, params);
  },
  addTodo: async (newTodo) => {
    return await axios.post(URL, newTodo);
  },
  updateTodo: async (todo) => {
    return await axios.put(`${URL}${todo.id}`, todo );
  },
  deleteTodo: async (id) => {
    return await axios.delete(URL + id);
  },
};

export default todoApi;
