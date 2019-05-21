import { graphql, compose } from 'react-apollo';
import createTrainingsGql from './createTrainings.gql';

const withCreateTrainings = graphql(createTrainingsGql, {
  name: 'createTrainings',
  props: ({ createTrainings }) => ({
    createTrainings: ({ trainings, projectId }) =>
      createTrainings({
        variables: { trainings, projectId },
        refetchQueries: ['myTrainings']
      })
  })
});

export default comp => compose(withCreateTrainings)(comp);
