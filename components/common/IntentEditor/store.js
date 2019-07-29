import { graphql, compose } from 'react-apollo';
import annotateUtteranceGql from './annotateUtterance.gql';

const withAnnotateUtterance = graphql(annotateUtteranceGql, {
  name: 'annotateUtterance',
  props: ({ annotateUtterance }) => ({
    annotateUtterance: ({ id, utterance }) =>
      annotateUtterance({
        variables: { id, utterance }
      })
  })
});

export default comp => compose(withAnnotateUtterance)(comp);
