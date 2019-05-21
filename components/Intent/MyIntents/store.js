import { graphql, compose } from 'react-apollo';
import getMyIntentsGql from './myIntents.gql';

const withMyIntents = graphql(getMyIntentsGql, {
  name: 'myIntents',
  options: ({ projectId, offset, limit, keyword }) => ({
    variables: {
      projectId,
      offset,
      limit,
      keyword
    }
  }),
  props: ({ myIntents: { loading, myIntents, error } }) => ({
    loading,
    myIntents,
    error
  })
});

export default comp => compose(withMyIntents)(comp);
