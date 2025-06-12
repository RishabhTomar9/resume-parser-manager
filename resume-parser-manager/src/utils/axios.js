import axios from 'axios';

export const api = (token) => {
  return axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: token
    }
  });
};
