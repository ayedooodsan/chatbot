import { graphql, compose } from 'react-apollo';
import createIntentGql from './createIntent.gql';

const withCreateIntent = graphql(createIntentGql, {
  name: 'createIntent',
  props: ({ createIntent }) => ({
    createIntent: ({ title, projectId }) =>
      createIntent({
        variables: { title, projectId },
        refetchQueries: ['myIntents']
      })
  })
});

export default comp => compose(withCreateIntent)(comp);
