import { graphql, compose } from 'react-apollo';
import detectIntentGql from './detectIntent.gql';
import trainProjectGql from './trainProject.gql';
import projectGql from './project.gql';

const withProject = graphql(projectGql, {
  name: 'project',
  options: props => ({
    variables: {
      id: props.router.query.projectId
    }
  }),
  props: ({ project: { loading, project, error } }) => {
    if (error) {
      return {
        loading,
        project: {}
      };
    }
    return {
      loading,
      project,
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
        context: { hideLoading: true },
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

export default comp =>
  compose(
    withProject,
    withDetectIntent,
    withTrainProject
  )(comp);
