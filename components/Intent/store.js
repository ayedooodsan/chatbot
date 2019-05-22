import { graphql, compose } from 'react-apollo';
import createIntentGql from './createIntent.gql';
import updateIntentQuery from './MyIntents/updateIntentQuery';
import updateSearchResultQuery from './SearchIntents/updateSearchResultQuery';

const withCreateIntent = graphql(createIntentGql, {
  name: 'createIntent',
  props: ({ createIntent }) => ({
    createIntent: ({ title, projectId }) =>
      createIntent({
        variables: { title, projectId },
        refetchQueries: ['myIntents'],
        update: cache => {
          updateIntentQuery(cache);
          updateSearchResultQuery(cache);
        }
      })
  })
});

export default comp => compose(withCreateIntent)(comp);
