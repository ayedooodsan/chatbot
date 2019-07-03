import { graphql, compose } from 'react-apollo';
import getMyEntitiesGql from './myEntities.gql';

const withMyEntities = graphql(getMyEntitiesGql, {
  name: 'myEntities',
  options: ({ projectId, offset, limit, keyword }) => ({
    variables: {
      projectId,
      offset,
      limit,
      keyword
    }
  }),
  props: ({ myEntities: { loading, myEntities, error } }) => ({
    loading,
    myEntities,
    error
  })
});

export default comp => compose(withMyEntities)(comp);
