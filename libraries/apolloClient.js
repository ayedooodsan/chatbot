import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import promiseToObservable from './promiseToObservable';
import { dispatchers } from '../redux/notifier';
import persist from './persist';
import { httpUrl, wsUrl } from '../graphql-url';

let apolloClient = null;

function createClient(headers, token, initialState, reduxStore) {
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: wsUrl,
        options: {
          reconnect: true
        }
      })
    : null;

  const httpLink = createUploadLink({
    uri: httpUrl,
    credentials: 'same-origin'
  });

  const terminatingLink = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink
      )
    : httpLink;

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
            variant: 'warning'
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
    const operationType = operation.query.definitions[0].operation;
    if (
      process.browser &&
      operationType === 'mutation' &&
      !operation.getContext().hideLoading
    ) {
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
                autoHideDuration: 2000
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
    const operationType = operation.query.definitions[0].operation;
    if (operationType !== 'subscription') {
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
    }
    return forward(operation);
  });

  return new ApolloClient({
    headers,
    link: errorLink.concat(
      ApolloLink.from([loadingLink, authLink, terminatingLink])
    ),
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
