import { graphql, compose } from 'react-apollo';
import getMyTrainingsGql from './myTrainings.gql';
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

const withMyTrainings = graphql(getMyTrainingsGql, {
  name: 'myTrainings',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ myTrainings: { loading, myTrainings, error } }) => ({
    loading,
    myTrainings,
    error
  })
});

export default comp =>
  compose(
    withCreateTrainings,
    withMyTrainings
  )(comp);
