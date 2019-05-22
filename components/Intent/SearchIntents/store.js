import { graphql, compose } from 'react-apollo';
import debounce from 'lodash/debounce';
import getSearchIntentsGql from './searchIntents.gql';
import withDebouncedProps from '../../../libraries/withDebouncedProps';

const withSearchIntents = graphql(getSearchIntentsGql, {
  name: 'searchIntents',
  options: ({ projectId, keyword }) => ({
    variables: {
      projectId,
      keyword
    }
  }),
  props: ({ searchIntents: { loading, searchIntents, error } }) => ({
    loading,
    searchIntents,
    error
  })
});

export default comp =>
  compose(
    withDebouncedProps(['keyword'], func => debounce(func, 1000)),
    withSearchIntents
  )(comp);
