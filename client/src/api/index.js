import axios from 'axios';

const url = `http://localhost:5000/posts`;
const tokenConfig = (getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const fetchposts = () => axios.get(url);
export const fetchtrash = () => axios.get(`${url}/trash`);
export const createPost = (newpost) => axios.post(`${url}/create`, newpost);
export const updatePost = (id, newpost) =>
  axios.post(`${url}/update/${id}`, newpost);
export const DeletePost = (id) => axios.delete(`${url}/${id}`);
export const IncLikes = (id) => axios.put(`${url}/likes/${id}`);
export const Restore = (id) => axios.post(`${url}/restore/${id}`);
export const Starred = () => axios.get(`${url}/starred`);
export const Remove = (id) => axios.delete(`${url}/remove/${id}`);
export const signup = (body) => axios.post(`${url}/signup`, body);
export const signin = () => axios.post(`${url}/signin`);
