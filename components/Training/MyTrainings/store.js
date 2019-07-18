import { graphql, compose } from 'react-apollo';
import getMyTrainingsGql from './myTrainings.gql';

const withMyTrainings = graphql(getMyTrainingsGql, {
  name: 'myTrainings',
  options: ({ projectId, offset, type, limit, keyword }) => ({
    variables: {
      projectId,
      type,
      offset,
      limit,
      keyword
    }
  }),
  props: ({ myTrainings: { loading, myTrainings, error } }) => ({
    loading,
    myTrainings,
    error
  })
});

export default comp => compose(withMyTrainings)(comp);
