import { graphql } from 'react-apollo';
import getMyIntentsGql from './getMyIntents.gql';

const withData = graphql(getMyIntentsGql, {
  name: 'getMyIntents',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ getMyIntents: { loading, myIntents, error } }) => ({
    loading,
    myIntents,
    error
  })
});

export default comp => withData(comp);
