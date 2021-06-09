const initialState = {
  posts: null,
  trash: null,
  starred: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return { ...initialState, posts: action.payload };
    case 'CREATE':
      return { ...state, posts: action.payload };
    case 'UPDATE':
      return state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case 'FETCH_TRASH':
      return { ...initialState, trash: action.payload };
    case 'FETCH_STARRED':
      return { ...initialState, starred: action.payload };
    default:
      return state;
  }
};
