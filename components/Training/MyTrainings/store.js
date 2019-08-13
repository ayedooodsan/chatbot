import { graphql, compose } from 'react-apollo';
import getMyTrainingsGql from './myTrainings.gql';

const withMyTrainings = graphql(getMyTrainingsGql, {
  name: 'myTrainings',
  options: ({ projectId, offset, limit, keyword, filters }) => ({
    variables: {
      projectId,
      offset,
      limit,
      filters,
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
