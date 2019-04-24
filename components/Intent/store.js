import { graphql, compose } from 'react-apollo';
import getMyIntentsGql from './myIntents.gql';
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

const withMyIntents = graphql(getMyIntentsGql, {
  name: 'myIntents',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ myIntents: { loading, myIntents, error } }) => ({
    loading,
    myIntents,
    error
  })
});

export default comp =>
  compose(
    withCreateIntent,
    withMyIntents
  )(comp);
