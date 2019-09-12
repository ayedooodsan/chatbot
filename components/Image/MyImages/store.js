import { graphql, compose } from 'react-apollo';
import myImagesGql from './myImages.gql';

const withMyImages = graphql(myImagesGql, {
  name: 'myImages',
  options: ({ projectId, offset, limit, keyword }) => ({
    variables: {
      projectId,
      offset,
      limit,
      keyword
    }
  }),
  props: ({ myImages: { loading, myImages, error } }) => ({
    loading,
    myImages,
    error
  })
});

export default comp => compose(withMyImages)(comp);
