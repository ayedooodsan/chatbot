import { graphql } from 'react-apollo';
import createIntent from './createIntent.gql';

const withMutation = graphql(createIntent, {
  props: ({ mutate }) => ({
    mutations: {
      createIntent: ({ firstName, lastName, email, password, username }) =>
        mutate({
          variables: { firstName, lastName, email, password, username }
        })
    }
  })
});

export default comp => withMutation(comp);
