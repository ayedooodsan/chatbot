import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { dispatchers } from '../redux/auth';
import rootReducer from './reducer';
import createMiddleware from './middleware';
import persist from './persist';

let reduxStore = null;
const middleware = createMiddleware(thunkMiddleware);

export default (initialState, tokenObj, role) => {
  let store;
  if (!process.browser || !reduxStore) {
    store = createStore(rootReducer(), initialState, middleware);
    console.log('store', JSON.stringify(store.getState()));
    let tokenInStore = store.getState().auth.token;
    let refreshTokenInStore = store.getState().auth.refreshToken;
    if (!tokenInStore) {
      (async () => {
        const tokenCookies = await persist.willGetAccessToken();
        if (tokenCookies) {
          tokenInStore = tokenCookies.token;
          refreshTokenInStore = tokenCookies.refreshToken;
        } else {
          tokenInStore = tokenObj.token;
          refreshTokenInStore = tokenObj.refreshToken;
        }
        let roleCookies = await persist.willGetProjectRole();
        if (!roleCookies) {
          roleCookies = role;
        }
        console.log(tokenObj);
        console.log({ tokenInStore });
        if (
          typeof tokenInStore === 'string' &&
          !tokenInStore.includes('Error')
        ) {
          if (tokenInStore.length) {
            store.dispatch(
              dispatchers.signIn(tokenInStore, refreshTokenInStore)
            );
            store.dispatch(dispatchers.setProjectRole(roleCookies));
          } else {
            console.log('sign out');
            store.dispatch(dispatchers.signOut());
          }
        } else {
          console.log('sign out');
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
