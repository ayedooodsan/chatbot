import { graphql, compose } from 'react-apollo';
import dialogAnalyticsGql from './dialogAnalytics.gql';

const withDialogAnalytics = graphql(dialogAnalyticsGql, {
  name: 'dialogAnalytics',
  options: props => ({
    variables: {
      id: props.id,
      date: props.date
    },
    fetchPolicy: 'network-only'
  }),
  props: ({ dialogAnalytics: { loading, dialogAnalytics, error } }) => ({
    loading,
    dialogAnalytics,
    error
  })
});

export default comp => compose(withDialogAnalytics)(comp);
