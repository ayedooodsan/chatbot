import { graphql, compose } from 'react-apollo';
import intentGql from './intent.gql';
import updateIntentGql from './updateIntent.gql';
import deleteIntentGql from './deleteIntent.gql';

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
    updateIntent: ({ id, title, values }) =>
      updateIntent({
        variables: { id, title, values },
        refetchQueries: ['getMyIntents', 'intent']
      })
  })
});

const withDeleteIntent = graphql(deleteIntentGql, {
  name: 'deleteIntent',
  props: ({ deleteIntent }) => ({
    deleteIntent: ({ id }) =>
      deleteIntent({
        variables: { id },
        refetchQueries: ['getMyIntents', 'intent']
      })
  })
});

export default comp =>
  compose(
    withIntent,
    withUpdateIntent,
    withDeleteIntent
  )(comp);
