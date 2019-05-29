import { graphql, compose } from 'react-apollo';
import debounce from 'lodash/debounce';
import userSuggestionsGql from './userSuggestions.gql';
import withDebouncedProps from '../../../libraries/withDebouncedProps';

const withData = graphql(userSuggestionsGql, {
  name: 'userSuggestions',
  options: ({ projectId, keyword }) => ({
    variables: {
      projectId,
      keyword
    }
  }),
  props: ({ userSuggestions: { loading, userSuggestions, error } }) => ({
    loading,
    userSuggestions,
    error
  })
});

export default comp =>
  compose(
    withDebouncedProps(['keyword'], func => debounce(func, 400)),
    withData
  )(comp);
