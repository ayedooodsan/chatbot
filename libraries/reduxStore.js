import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { dispatchers } from '../redux/auth';
import rootReducer from './reducer';
import createMiddleware from './middleware';
import persist from './persist';

let reduxStore = null;
const middleware = createMiddleware(thunkMiddleware);

export default (initialState, token) => {
  let store;
  if (!process.browser || !reduxStore) {
    store = createStore(rootReducer(), initialState, middleware);
    let tokenInStore = store.getState().auth.token;
    if (!tokenInStore) {
      (async () => {
        tokenInStore =
          token || (await Promise.resolve(persist.willGetAccessToken()));
        if (
          typeof tokenInStore === 'string' &&
          !tokenInStore.includes('Error')
        ) {
          if (tokenInStore.length) {
            store.dispatch(dispatchers.signIn(tokenInStore));
          } else {
            store.dispatch(dispatchers.signOut());
          }
        } else {
          store.dispatch(dispatchers.signOut());
        }
      })();
    }

    if (!process.browser) {
      return store;
    }

    reduxStore = store;
  }
  return reduxStore;
};
