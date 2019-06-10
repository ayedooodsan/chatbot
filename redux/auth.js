import persist from '../libraries/persist';

// Constants
export const AUTH_SIGNIN = 'AUTH/SIGNIN';
export const AUTH_SIGNOUT = 'AUTH/SIGNOUT';
export const AUTH_SERVERERROR = 'AUTH/SERVERERROR';
export const AUTH_PROJECT_ROLE = 'AUTH/PROJECT_ROLE';

// Initial State
const initialState = {
  authenticated: false,
  token: null,
  refreshToken: null,
  role: null,
  error: null
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return {
        ...state,
        authenticated: true,
        token: action.token,
        refreshToken: action.refreshToken,
        error: null
      };
    case AUTH_SIGNOUT:
      return { ...state, authenticated: false, token: null, error: null };
    case AUTH_SERVERERROR:
      return { ...state, authenticated: false, error: action.error };
    case AUTH_PROJECT_ROLE:
      return { ...state, role: action.role };
    default:
      return state;
  }
};

// Action creators
const actionCreators = {};

actionCreators.signIn = (token, refreshToken) => ({
  type: AUTH_SIGNIN,
  token,
  refreshToken
});
actionCreators.signOut = () => ({ type: AUTH_SIGNOUT });
actionCreators.setProjectRole = role => ({
  type: AUTH_PROJECT_ROLE,
  role
});

// Discpatchers
const dispatchers = {};

dispatchers.signIn = (token, refreshToken) => {
  persist.willSetAccessToken(JSON.stringify({ token, refreshToken }));
  return actionCreators.signIn(token);
};

dispatchers.signOut = () => {
  persist.willRemoveAccessToken();
  persist.willRemoveProjectRole();
  return actionCreators.signOut();
};

dispatchers.setProjectRole = role => {
  persist.willSetProjectRole(role);
  return actionCreators.setProjectRole(role);
};

export { actionCreators, reducer, dispatchers };
