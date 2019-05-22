import { graphql, compose } from 'react-apollo';
import intentGql from './intent.gql';
import updateIntentGql from './updateIntent.gql';
import deleteIntentGql from './deleteIntent.gql';
import invalidateAllIntent from '../../../libraries/updateApolloCache/invalidateAllIntent';
import invalidateAllSearchResult from '../../../libraries/updateApolloCache/invalidateAllSearchResult';

const withIntent = graphql(intentGql, {
  name: 'intent',
  options: props => ({
    variables: {
      id: props.intentId
    }
  }),
  props: ({ intent: { loading, intent, error } }) => {
    if (error) {
      return {
        loading,
        intent: {}
      };
    }
    return {
      loading,
      intent,
      error
    };
  }
});

const withUpdateIntent = graphql(updateIntentGql, {
  name: 'updateIntent',
  props: ({ updateIntent }) => ({
    updateIntent: ({ id, title, values, params }) =>
      updateIntent({
        variables: { id, title, values, params },
        refetchQueries: ['myIntents', 'intent', 'searchIntents']
      })
  })
});

const withDeleteIntent = graphql(deleteIntentGql, {
  name: 'deleteIntent',
  props: ({ deleteIntent }) => ({
    deleteIntent: ({ id }) =>
      deleteIntent({
        variables: { id },
        refetchQueries: ['myIntents', 'searchIntents'],
        update: cache => {
          invalidateAllIntent(cache);
          invalidateAllSearchResult(cache);
        }
      })
  })
});

export default comp =>
  compose(
    withIntent,
    withUpdateIntent,
    withDeleteIntent
  )(comp);
