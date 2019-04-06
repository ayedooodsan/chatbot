import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../redux/auth';
import signin from './signin.gql';

const withMutation = graphql(signin, {
  props: ({ mutate }) => ({
    mutations: {
      signIn: ({ login, password }) =>
        mutate({
          variables: { login, password }
        })
    }
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signIn(token) {
      dispatch(dispatchers.signIn(token));
    }
  }
});

export default comp => {
  const compWithApollo = withMutation(comp);
  return connect(
    null,
    mapDispatchToProps
  )(compWithApollo);
};
