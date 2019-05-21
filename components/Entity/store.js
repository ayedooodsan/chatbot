import { graphql, compose } from 'react-apollo';
import createEntityGql from './createEntity.gql';
import updateEntityQuery from './MyEntities/updateEntityQuery';

const withCreateEntity = graphql(createEntityGql, {
  name: 'createEntity',
  props: ({ createEntity }) => ({
    createEntity: ({ title, projectId }) =>
      createEntity({
        variables: { title, projectId },
        refetchQueries: ['myEntities'],
        update: updateEntityQuery
      })
  })
});

export default comp => compose(withCreateEntity)(comp);
