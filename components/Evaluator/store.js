import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../redux/notifier';
import { dispatchers as dispatchersAuth } from '../../redux/auth';
import detectIntentGql from './detectIntent.gql';
import freeDetectIntentGql from './freeDetectIntent.gql';
import trainProjectGql from './trainProject.gql';
import projectGql from './project.gql';
import projectTrainingGql from './projectTraining.gql';
import projectTrainedGql from './projectTrained.gql';
import meGql from './me.gql';

const withProject = graphql(projectGql, {
  name: 'project',
  options: props => ({
    variables: {
      id: props.router.query.projectId
    }
  }),
  props: ({ project: { loading, project, error, subscribeToMore } }) => {
    if (error) {
      return {
        loading,
        project: {}
      };
    }
    return {
      loading,
      project,
      subscribeProjectTraining: ({ id, onSubscriptionData }) => {
        return subscribeToMore({
          document: projectTrainingGql,
          variables: { id },
          updateQuery: (prev, { subscriptionData }) => {
            onSubscriptionData(subscriptionData.data.projectTraining.username);
          }
        });
      },
      subscribeProjectTrained: ({ id, onSubscriptionData }) => {
        return subscribeToMore({
          document: projectTrainedGql,
          variables: { id },
          updateQuery: (prev, { subscriptionData }) => {
            onSubscriptionData(subscriptionData.data.projectTrained.username);
          }
        });
      },
      error
    };
  }
});

const withMe = graphql(meGql, {
  name: 'me',
  props: ({ me: { loading, me, error } }) => {
    return {
      loading,
      me,
      error
    };
  }
});

const withTrainProject = graphql(trainProjectGql, {
  name: 'trainProject',
  props: ({ trainProject }) => ({
    trainProject: ({ id }) =>
      trainProject({
        variables: { id },
        refetchQueries: ['project']
      })
  })
});

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

const withFreeDetectIntent = graphql(freeDetectIntentGql, {
  name: 'freeDetectIntent',
  props: ({ freeDetectIntent }) => ({
    freeDetectIntent: ({ id, sessionTag, utterance }) =>
      freeDetectIntent({
        variables: { id, sessionTag, utterance },
        context: { hideLoading: true }
      })
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    notify({ message, variant, autoHideDuration }) {
      const key = new Date().getTime() + Math.random();
      dispatch(
        dispatchers.enqueueSnackbar({
          message,
          options: {
            key,
            variant,
            autoHideDuration
          }
        })
      );
      return key;
    },
    closeNotification(key) {
      dispatch(dispatchers.closeSnackbar(key));
    },
    setUserMeInfo(username) {
      dispatch(dispatchersAuth.setUsername(username));
    }
  }
});

const mapStateToProps = ({ projectSetting }) => ({ projectSetting });

export default comp => {
  const compWithApollo = compose(
    withProject,
    withFreeDetectIntent,
    withDetectIntent,
    withMe,
    withTrainProject
  )(comp);
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(compWithApollo);
};
