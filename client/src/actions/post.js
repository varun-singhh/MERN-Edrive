import { fetchposts, createPost, updatePost } from '../api';
export const getposts = () => async (dispatch, getState) => {
  try {
    const { data } = await fetchposts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const create = (post) => async (dispatch, getState) => {
  console.log(post);
  try {
    const { data } = await createPost(post);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const update = (id, post) => async (dispatch, getState) => {
  try {
    const { data } = await updatePost(id, post);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
