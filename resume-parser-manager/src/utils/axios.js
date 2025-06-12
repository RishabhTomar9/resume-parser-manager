// utils/axios.js

import axios from 'axios';

export const api = (token) => axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    Authorization: `${token}`
  }
});
