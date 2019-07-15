import { graphql, compose } from 'react-apollo';
import detectIntentGql from './detectIntent.gql';

const withDetectIntent = graphql(detectIntentGql, {
  name: 'detectIntent',
  props: ({ detectIntent }) => ({
    detectIntent: ({ id, sessionTag, utterance, contexts }) =>
      detectIntent({
        variables: { id, sessionTag, utterance, contexts },
        context: { hideLoading: true }
      })
  })
});

export default comp => compose(withDetectIntent)(comp);
