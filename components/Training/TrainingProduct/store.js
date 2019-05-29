import { graphql, compose } from 'react-apollo';
import intentGql from '../../Intent/IntentProduct/intent.gql';
import trainingGql from './training.gql';
import updateTrainingGql from './updateTraining.gql';
import approveTrainingGql from './approveTraining.gql';
import deleteTrainingGql from './deleteTraining.gql';
import updateTrainingQuery from '../MyTrainings/updateTrainingQuery';

const withTraining = graphql(trainingGql, {
  name: 'training',
  options: props => ({
    variables: {
      id: props.trainingId
    }
  }),
  props: ({ training: { loading, training, error } }) => {
    if (error) {
      return {
        loading,
        training: {}
      };
    }
    return {
      loading,
      training,
      error
    };
  }
});

const withUpdateTraining = graphql(updateTrainingGql, {
  name: 'updateTraining',
  props: ({ updateTraining }) => ({
    updateTraining: ({ id, title, userSays }) =>
      updateTraining({
        variables: { id, title, userSays },
        refetchQueries: ['myTrainings', 'training']
      })
  })
});

const withApproveTraining = graphql(approveTrainingGql, {
  name: 'approveTraining',
  props: ({ approveTraining }) => ({
    approveTraining: ({ id, title, userSays }) =>
      approveTraining({
        variables: { id, title, userSays },
        refetchQueries: [
          'myTrainings',
          'training',
          ...userSays
            .filter(userSay => userSay.actionStatus === 'Check')
            .map(userSay => ({
              query: intentGql,
              variables: { id: userSay.intentResultId }
            }))
        ]
      })
  })
});

const withDeleteTraining = graphql(deleteTrainingGql, {
  name: 'deleteTraining',
  props: ({ deleteTraining }) => ({
    deleteTraining: ({ id }) =>
      deleteTraining({
        variables: { id },
        refetchQueries: ['myTrainings'],
        update: updateTrainingQuery
      })
  })
});

export default comp =>
  compose(
    withTraining,
    withUpdateTraining,
    withApproveTraining,
    withDeleteTraining
  )(comp);
