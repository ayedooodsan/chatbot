import { graphql, compose } from 'react-apollo';
import debounce from 'lodash/debounce';
import intentSuggestionsGql from './intentSuggestions.gql';
import withDebouncedProps from '../../../libraries/withDebouncedProps';

const withData = graphql(intentSuggestionsGql, {
  name: 'intentSuggestions',
  options: ({ projectId, keyword }) => ({
    variables: {
      projectId,
      keyword
    }
  }),
  props: ({ intentSuggestions: { loading, intentSuggestions, error } }) => ({
    loading,
    intentSuggestions,
    error
  })
});

export default comp =>
  compose(
    withDebouncedProps(['keyword'], func => debounce(func, 400)),
    withData
  )(comp);
