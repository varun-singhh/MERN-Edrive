import { signup, signin } from '../api/index';
export const Signup = (body) => async (dispatch, getState) => {
  try {
    const { data } = await signup(body);
    dispatch({ type: 'SIGNED_IN', payload: data.result });
  } catch (error) {}
};
