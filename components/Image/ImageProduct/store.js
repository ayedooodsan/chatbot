import { graphql, compose } from 'react-apollo';
import deleteImageGql from './deleteImage.gql';

const withDeleteImage = graphql(deleteImageGql, {
  name: 'deleteImage',
  props: ({ deleteImage }) => ({
    deleteImage: ({ id }) =>
      deleteImage({
        variables: { id },
        refetchQueries: ['myImages']
      })
  })
});

export default comp => compose(withDeleteImage)(comp);
