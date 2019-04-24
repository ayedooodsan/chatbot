import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';
import persist from './persist';

let apolloClient = null;

const httpLink = createHttpLink({
  uri: 'http://localhost:4237/graphql',
  credentials: 'same-origin'
});

function createClient(headers, token, initialState) {
  let accessToken = token;

  (async () => {
    // eslint-disable-next-line no-param-reassign
    const tokenCookies = await persist.willGetAccessToken();
    if (tokenCookies) {
      accessToken = JSON.parse(tokenCookies);
    }
  })();
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
  }).concat(httpLink);

  return new ApolloClient({
    headers,
    link: authLink,
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default (headers, token, initialState) => {
  if (!process.browser) {
    return createClient(headers, token, initialState);
  }
  if (apolloClient) {
    const currentState = apolloClient.cache.extract();
    apolloClient = createClient(headers, token, currentState);
  } else {
    apolloClient = createClient(headers, token, initialState);
  }
  return apolloClient;
};
