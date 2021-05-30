import axios from 'axios';

const url = `http://localhost:5000/posts`;

export const fetchposts = () => axios.get(url);
export const createPost = (newpost) => axios.post(`${url}/create`, newpost);
export const updatePost = (id,newpost) => axios.post(`${url}/update/${id}`, newpost);
