import { graphql, compose } from 'react-apollo';
import resetPasswordUserQql from './resetPasswordUser.gql';

const withResetPasswordUser = graphql(resetPasswordUserQql, {
  name: 'resetPasswordUser',
  props: ({ resetPasswordUser }) => ({
    resetPasswordUser: ({ username, password }) =>
      resetPasswordUser({
        variables: {
          username,
          password
        },
        refetchQueries: ['user']
      })
  })
});

export default comp => compose(withResetPasswordUser)(comp);
