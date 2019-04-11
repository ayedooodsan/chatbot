import { graphql, compose } from 'react-apollo';
import getIntentGql from './getIntent.gql';
import createIntentGql from './createIntent.gql';
import updateIntentGql from './updateIntent.gql';

const withGetIntent = graphql(getIntentGql, {
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

const withCreateIntent = graphql(createIntentGql, {
  name: 'createIntent',
  props: ({ createIntent }) => ({
    createIntent: ({ title, values, projectId }) =>
      createIntent({
        variables: { title, values, projectId },
        refetchQueries: ['getMyIntents']
      })
  })
});

const withUpdateIntent = graphql(updateIntentGql, {
  name: 'updateIntent',
  props: ({ updateIntent }) => ({
    updateIntent: ({ id, title, values }) =>
      updateIntent({
        variables: { id, title, values },
        refetchQueries: ['getMyIntents']
      })
  })
});

export default comp =>
  compose(
    withGetIntent,
    withCreateIntent,
    withUpdateIntent
  )(comp);
