import { graphql, compose } from 'react-apollo';
import createEntityGql from './createEntity.gql';
import invalidateAllEntity from '../../libraries/updateApolloCache/invalidateAllEntity';
import invalidateAllSearchResult from '../../libraries/updateApolloCache/invalidateAllSearchResult';

const withCreateEntity = graphql(createEntityGql, {
  name: 'createEntity',
  props: ({ createEntity }) => ({
    createEntity: ({ title, projectId }) =>
      createEntity({
        variables: { title, projectId },
        refetchQueries: ['myEntities', 'searchEntities', 'project'],
        update: cache => {
          invalidateAllSearchResult(cache);
          invalidateAllEntity(cache);
        }
      })
  })
});

export default comp => compose(withCreateEntity)(comp);
