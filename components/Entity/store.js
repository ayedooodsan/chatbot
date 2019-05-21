import { graphql, compose } from 'react-apollo';
import createEntityGql from './createEntity.gql';

const withCreateEntity = graphql(createEntityGql, {
  name: 'createEntity',
  props: ({ createEntity }) => ({
    createEntity: ({ title, projectId }) =>
      createEntity({
        variables: { title, projectId },
        refetchQueries: ['myEntities']
      })
  })
});

export default comp => compose(withCreateEntity)(comp);
