import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../redux/auth';
import signup from './signup.gql';

const withMutation = graphql(signup, {
  props: ({ mutate }) => ({
    mutations: {
      signUp: ({ firstName, lastName, email, password, username }) =>
        mutate({
          variables: { firstName, lastName, email, password, username }
        })
    }
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signIn(token, refreshToken) {
      dispatch(dispatchers.signIn(token, refreshToken));
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
