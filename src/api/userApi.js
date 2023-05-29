/** @format */

import axios from 'axios';

const URL = 'http://localhost:3000/users/';
const userApi = {
  getAllUser: async (params) => {
    return await axios.get(URL, params);
  },
  addUser: async (data) => {
    return await axios.post(URL, data);
  },
  updateUser: async (params) => {
    return await axios.put(URL, params);
  },
  deleteUser: async (id) => {
    return await axios.delete(URL + id);
  },
};

export default userApi;
