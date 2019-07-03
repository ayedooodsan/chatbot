import { graphql, compose } from 'react-apollo';
import entityGql from './entity.gql';
import updateEntityGql from './updateEntity.gql';
import deleteEntityGql from './deleteEntity.gql';
import invalidateAllEntity from '../../../libraries/updateApolloCache/invalidateAllEntity';
import invalidateAllSearchResult from '../../../libraries/updateApolloCache/invalidateAllSearchResult';

const withEntity = graphql(entityGql, {
  name: 'entity',
  options: props => ({
    variables: {
      id: props.entityId
    }
  }),
  props: ({ entity: { loading, entity, error } }) => {
    if (error) {
      return {
        loading,
        entity: {}
      };
    }
    return {
      loading,
      entity,
      error
    };
  }
});

const withUpdateEntity = graphql(updateEntityGql, {
  name: 'updateEntity',
  props: ({ updateEntity }) => ({
    updateEntity: ({ id, title, values }) =>
      updateEntity({
        variables: { id, title, values },
        refetchQueries: ['myEntities', 'entity', 'searchEntities']
      })
  })
});

const withDeleteEntity = graphql(deleteEntityGql, {
  name: 'deleteEntity',
  props: ({ deleteEntity }) => ({
    deleteEntity: ({ id }) =>
      deleteEntity({
        variables: { id },
        refetchQueries: ['myEntities', 'searchEntities'],
        update: cache => {
          invalidateAllEntity(cache);
          invalidateAllSearchResult(cache);
        }
      })
  })
});

export default comp =>
  compose(
    withEntity,
    withUpdateEntity,
    withDeleteEntity
  )(comp);
