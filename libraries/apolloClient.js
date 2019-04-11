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
    accessToken = token || (await persist.willGetAccessToken());
  })();
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'x-token': accessToken || ''
      }
    });
    return forward(operation);
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
    console.log({ currentState });
    apolloClient = createClient(headers, token, currentState);
  } else {
    apolloClient = createClient(headers, token, initialState);
  }
  return apolloClient;
};
