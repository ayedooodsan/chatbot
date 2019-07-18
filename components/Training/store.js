import { graphql, compose } from 'react-apollo';
import createTrainingsGql from './createTrainings.gql';
import updateTrainingQuery from './MyTrainings/updateTrainingQuery';

const withCreateTrainings = graphql(createTrainingsGql, {
  name: 'createTrainings',
  props: ({ createTrainings }) => ({
    createTrainings: ({ trainings, projectId }) =>
      createTrainings({
        variables: { trainings, projectId },
        refetchQueries: ['myTrainings'],
        update: updateTrainingQuery
      })
  })
});

export default comp => compose(withCreateTrainings)(comp);
