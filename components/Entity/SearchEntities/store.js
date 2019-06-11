import { graphql, compose } from 'react-apollo';
import debounce from 'lodash/debounce';
import getSearchEntitiesGql from './searchEntities.gql';
import withDebouncedProps from '../../../libraries/withDebouncedProps';

const withSearchEntities = graphql(getSearchEntitiesGql, {
  name: 'searchEntities',
  options: ({ projectId, keyword, offset, limit }) => ({
    variables: {
      projectId,
      keyword,
      offset,
      limit
    }
  }),
  props: ({ searchEntities: { loading, searchEntities, error } }) => ({
    loading,
    searchEntities,
    error
  })
});

export default comp =>
  compose(
    withDebouncedProps(['keyword'], func => debounce(func, 1000)),
    withSearchEntities
  )(comp);
