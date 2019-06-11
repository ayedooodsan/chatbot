import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-client-preset';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import promiseToObservable from './promiseToObservable';
import { dispatchers } from '../redux/notifier';
import persist from './persist';
import uri from '../graphql-url';

let apolloClient = null;

function createClient(headers, token, initialState, reduxStore) {
  const httpLink = createUploadLink({
    uri,
    credentials: 'same-origin'
  });

  const errorLink = onError(({ graphQLErrors, forward, operation }) => {
    if (graphQLErrors) {
      const text = graphQLErrors.map(({ message }) => message).join('; ');
      if (text.includes('Not authenticated as user.')) {
        promiseToObservable(
          new Promise(async resolve => {
            const status = await persist.willRemoveAccessToken();
            resolve(status);
          })
        ).flatMap(() => forward(operation));
      }
      reduxStore.dispatch(
        dispatchers.enqueueSnackbar({
          message: text,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
            action: key => (
              <IconButton
                onClick={() =>
                  reduxStore.dispatch(dispatchers.closeSnackbar(key))
                }
              >
                <Close />
              </IconButton>
            )
          }
        })
      );
    }
  });

  let accessToken = token;

  (async () => {
    // eslint-disable-next-line no-param-reassign
    const tokenCookies = await persist.willGetAccessToken();
    if (tokenCookies) {
      accessToken = JSON.parse(tokenCookies);
    }
  })();

  const loadingLink = new ApolloLink((operation, forward) => {
    if (process.browser) {
      const loadingSnackbarKey = new Date().getTime() + Math.random();
      reduxStore.dispatch(
        dispatchers.enqueueSnackbar({
          message: `waiting for ${operation.operationName} operation ...`,
          options: {
            key: loadingSnackbarKey,
            variant: 'info',
            autoHideDuration: 120000
          }
        })
      );
      return forward(operation).map(response => {
        reduxStore.dispatch(dispatchers.closeSnackbar(loadingSnackbarKey));
        if (!response.errors) {
          reduxStore.dispatch(
            dispatchers.enqueueSnackbar({
              message: `${
                operation.operationName
              } operation successfully completed.`,
              options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
                autoHideDuration: 3000
              }
            })
          );
        }
        return response;
      });
    }
    return forward(operation);
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'x-token': accessToken.token || '',
        'x-refresh-token': accessToken.refreshToken || ''
      }
    });
    return forward(operation).map(response => {
      const context = operation.getContext();
      const responseHeaders = context.response.headers;

      if (responseHeaders) {
        const newToken = responseHeaders.get('x-token');
        const newRefreshToken = responseHeaders.get('x-refresh-token');
        if (newToken !== null && newRefreshToken !== null) {
          persist.willSetAccessToken(
            JSON.stringify({ token: newToken, refreshToken: newRefreshToken })
          );
        }
      }

      return response;
    });
  });

  return new ApolloClient({
    headers,
    link: errorLink.concat(from([loadingLink, authLink, httpLink])),
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default (headers, token, initialState, reduxStore, resetStore) => {
  if (!process.browser) {
    return createClient(headers, token, initialState, reduxStore);
  }
  if (resetStore) {
    apolloClient = createClient(headers, token, initialState, reduxStore);
  } else if (apolloClient) {
    const currentState = apolloClient.cache.extract();
    apolloClient = createClient(headers, token, currentState, reduxStore);
  } else {
    apolloClient = createClient(headers, token, initialState, reduxStore);
  }
  return apolloClient;
};
