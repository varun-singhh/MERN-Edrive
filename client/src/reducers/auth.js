const initialState = {
  isAuthenticated: false,
  user: null,
  msg: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return {
        isAuthenticated: true,
        user: action.payload,
        msg: 'User Signed in Successfully!!',
      };
    case 'SIGNED_UP':
      return {
        isAuthenticated: false,
        user: action.payload,
        msg: 'User Registered Successfully!!',
      };
    case 'SIGNED_OUT':
      return { isAuthenticated: false, user: null, msg: 'User Logged Out !!' };
    case 'ERROR':
      return { isAuthenticated: false, user: null, msg: 'Invalid Request' };
    default:
      return state;
  }
};
