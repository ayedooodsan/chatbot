import { graphql, compose } from 'react-apollo';
import getMyEntitiesGql from './myEntities.gql';
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

const withMyEntities = graphql(getMyEntitiesGql, {
  name: 'myEntities',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ myEntities: { loading, myEntities, error } }) => ({
    loading,
    myEntities,
    error
  })
});

export default comp =>
  compose(
    withCreateEntity,
    withMyEntities
  )(comp);
