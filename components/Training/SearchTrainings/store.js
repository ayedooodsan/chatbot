import { graphql, compose } from 'react-apollo';
import debounce from 'lodash/debounce';
import getSearchTrainingsGql from './searchTrainings.gql';
import withDebouncedProps from '../../../libraries/withDebouncedProps';

const withSearchTrainings = graphql(getSearchTrainingsGql, {
  name: 'searchTrainings',
  options: ({ projectId, keyword, offset, limit }) => ({
    variables: {
      projectId,
      keyword,
      offset,
      limit
    }
  }),
  props: ({ searchTrainings: { loading, searchTrainings, error } }) => ({
    loading,
    searchTrainings,
    error
  })
});

export default comp =>
  compose(
    withDebouncedProps(['keyword'], func => debounce(func, 1000)),
    withSearchTrainings
  )(comp);
