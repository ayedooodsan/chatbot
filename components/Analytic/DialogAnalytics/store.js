import { graphql, compose } from 'react-apollo';
import dialogAnalyticsGql from './dialogAnalytics.gql';

const withDialogAnalytics = graphql(dialogAnalyticsGql, {
  name: 'dialogAnalytics',
  options: props => ({
    variables: {
      date: props.date
    }
  }),
  props: ({ dialogAnalytics: { loading, dialogAnalytics, error } }) => ({
    loading,
    dialogAnalytics,
    error
  })
});

export default comp => compose(withDialogAnalytics)(comp);
