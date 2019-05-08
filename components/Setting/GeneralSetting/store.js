import { graphql, compose } from 'react-apollo';
import projectGql from './project.gql';
import deleteProjectGql from './deleteProject.gql';
import updateProjectGql from './updateProject.gql';

const withProject = graphql(projectGql, {
  name: 'project',
  options: props => ({
    variables: {
      id: props.projectId
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

const withUpdateProject = graphql(updateProjectGql, {
  name: 'updateProject',
  props: ({ updateProject }) => ({
    updateProject: ({ id, title, values }) =>
      updateProject({
        variables: { id, title, values },
        refetchQueries: ['myProjects', 'project']
      })
  })
});

const withDeleteProject = graphql(deleteProjectGql, {
  name: 'deleteProject',
  props: ({ deleteProject }) => ({
    deleteProject: ({ id }) =>
      deleteProject({
        variables: { id },
        refetchQueries: ['myProjects']
      })
  })
});

export default comp =>
  compose(
    withProject,
    withUpdateProject,
    withDeleteProject
  )(comp);
