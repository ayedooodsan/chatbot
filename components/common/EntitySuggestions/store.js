import { graphql, compose } from 'react-apollo';
import debounce from 'lodash/debounce';
import entitySuggestionsGql from './entitySuggestions.gql';
import withDebouncedProps from '../../../libraries/withDebouncedProps';

const withData = graphql(entitySuggestionsGql, {
  name: 'entitySuggestions',
  options: ({ projectId, keyword }) => ({
    variables: {
      projectId,
      keyword
    }
  }),
  props: ({ entitySuggestions: { loading, entitySuggestions, error } }) => ({
    loading,
    entitySuggestions,
    error
  })
});

export default comp =>
  compose(
    withDebouncedProps(['keyword'], func => debounce(func, 400)),
    withData
  )(comp);
