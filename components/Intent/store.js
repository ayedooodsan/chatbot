import { graphql, compose } from 'react-apollo';
import createIntentGql from './createIntent.gql';
import invalidateAllIntent from '../../libraries/updateApolloCache/invalidateAllIntent';
import invalidateAllSearchResult from '../../libraries/updateApolloCache/invalidateAllSearchResult';

const withCreateIntent = graphql(createIntentGql, {
  name: 'createIntent',
  props: ({ createIntent }) => ({
    createIntent: ({ title, projectId }) =>
      createIntent({
        variables: { title, projectId },
        refetchQueries: ['myIntents', 'searchIntents'],
        update: cache => {
          invalidateAllIntent(cache);
          invalidateAllSearchResult(cache);
        }
      })
  })
});

export default comp => compose(withCreateIntent)(comp);
