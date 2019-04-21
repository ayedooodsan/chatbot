import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import cookies from 'next-cookies';
import apolloClient from './apolloClient';
import reduxStore from './reduxStore';
import persist from './persist';
import redirect from './redirect';

export default Component =>
  class extends React.Component {
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
      reduxState: PropTypes.object.isRequired,
      headers: PropTypes.object.isRequired,
      accessToken: PropTypes.string
    };

    static defaultProps = {
      accessToken: ''
    };

    constructor(props) {
      super(props);
      this.apolloClient = apolloClient(
        this.props.headers,
        this.props.accessToken,
        this.props.apolloState
      );
      this.reduxStore = reduxStore(this.props.reduxState, {});
    }

    static async getInitialProps(ctx) {
      let apolloState = {};
      let serverState = {};

      const headers = ctx.req ? ctx.req.headers : {};
      const tokenCookies = cookies(ctx)[persist.ACCESS_TOKEN_KEY];
      let token = {};
      if (tokenCookies) {
        token = JSON.parse(tokenCookies);
      }
      const { isPublic } = Component;
      if (!isPublic && !token) {
        redirect(ctx, '/');
      }

      const props = {
        router: {
          url: { query: ctx.query, pathname: ctx.pathname }
        },
        ...(await (typeof Component.getInitialProps === 'function'
          ? Component.getInitialProps(ctx)
          : {}))
      };

      if (!process.browser) {
        const client = apolloClient(headers || {}, token, {}, ctx);
        const store = reduxStore(undefined, token);
        try {
          const app = (
            <ApolloProvider client={client}>
              <ReduxProvider store={store}>
                <Component {...props} />
              </ReduxProvider>
            </ApolloProvider>
          );
          await getDataFromTree(app);
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://github.com/apollographql/react-apollo/issues/406
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }

        apolloState = client.cache.extract();
        serverState = store.getState();
      }

      return {
        reduxState: serverState,
        apolloState,
        headers,
        accessToken: token,
        ...props
      };
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ReduxProvider store={this.reduxStore}>
            <Component {...this.props} />
          </ReduxProvider>
        </ApolloProvider>
      );
    }
  };
