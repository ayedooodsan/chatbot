import { graphql, compose } from 'react-apollo';
import getMyDialogsGql from './myDialogs.gql';

const withMyDialogs = graphql(getMyDialogsGql, {
  name: 'myDialogs',
  options: ({ projectId, offset, limit, keyword }) => ({
    variables: {
      projectId,
      offset,
      limit,
      keyword
    }
  }),
  props: ({ myDialogs: { loading, myDialogs, error } }) => ({
    loading,
    myDialogs,
    error
  })
});

export default comp => compose(withMyDialogs)(comp);
