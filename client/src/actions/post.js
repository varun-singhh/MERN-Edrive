import {
  fetchposts,
  createPost,
  updatePost,
  DeletePost,
  IncLikes,
  fetchtrash,
  Starred,
  Remove,
  Restore,
} from '../api';
export const getposts = () => async (dispatch, getState) => {
  try {
    const { data } = await fetchposts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const create = (post) => async (dispatch, getState) => {
  try {
    const { data } = await createPost(post);
    dispatch(getposts());
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
export const Delete = (id) => async (dispatch, getState) => {
  try {
    const { data } = await DeletePost(id);
    dispatch(getposts());
  } catch (error) {
    console.log(error.message);
  }
};
export const LikesIncrease = (id) => async (dispatch, getState) => {
  try {
    await IncLikes(id);
    dispatch(getposts());
  } catch (error) {
    console.log(error.message);
  }
};
export const Trash = () => async (dispatch, getState) => {
  try {
    const { data } = await fetchtrash();
    dispatch({ type: 'FETCH_TRASH', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const starred = () => async (dispatch, getState) => {
  try {
    const { data } = await Starred();
    console.log(data);
    dispatch({ type: 'FETCH_STARRED', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const remove = (id) => async (dispatch, getState) => {
  try {
    const { data } = await Remove(id);
    dispatch(getposts());
  } catch (error) {
    console.log(error.message);
  }
};
export const restore = (id) => async (dispatch, getState) => {
  try {
    const { data } = await Restore(id);
    dispatch(getposts());
  } catch (error) {
    console.log(error.message);
  }
};
