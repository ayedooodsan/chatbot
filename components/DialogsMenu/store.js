import { graphql } from 'react-apollo';
import getMyDialogsGql from './getMyDialogs.gql';

const withData = graphql(getMyDialogsGql, {
  name: 'getMyDialogs',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ getMyDialogs: { loading, myDialogs, error } }) => ({
    loading,
    myDialogs,
    error
  })
});

export default comp => withData(comp);
