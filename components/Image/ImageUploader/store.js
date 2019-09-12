import { graphql, compose } from 'react-apollo';
import createImageGql from './createImage.gql';

const withCreateImage = graphql(createImageGql, {
  name: 'createImage',
  props: ({ createImage }) => ({
    createImage: ({ id, name, file }) =>
      createImage({
        variables: { id, file, name },
        refetchQueries: ['myImages']
      })
  })
});

export default comp => compose(withCreateImage)(comp);
