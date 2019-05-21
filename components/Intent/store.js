import { graphql, compose } from 'react-apollo';
import createIntentGql from './createIntent.gql';
import updateIntentQuery from './MyIntents/updateIntentQuery';

const withCreateIntent = graphql(createIntentGql, {
  name: 'createIntent',
  props: ({ createIntent }) => ({
    createIntent: ({ title, projectId }) =>
      createIntent({
        variables: { title, projectId },
        refetchQueries: ['myIntents'],
        update: updateIntentQuery
      })
  })
});

export default comp => compose(withCreateIntent)(comp);
