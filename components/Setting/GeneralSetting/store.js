import { graphql, compose } from 'react-apollo';
import projectGql from './project.gql';
import deleteProjectGql from './deleteProject.gql';
import updateProjectGql from './updateProject.gql';
import timeZonesGql from './timeZones.gql';
import languagesGql from './languages.gql';
import invalidateStore from '../../../libraries/updateApolloCache/invalidateStore';

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

const withTimeZones = graphql(timeZonesGql, {
  name: 'timeZones',
  props: ({ timeZones: { loading, timeZones, error } }) => ({
    loading,
    timeZones,
    error
  })
});

const withLanguages = graphql(languagesGql, {
  name: 'languages',
  props: ({ languages: { loading, languages, error } }) => ({
    loading,
    languages,
    error
  })
});

const withUpdateProject = graphql(updateProjectGql, {
  name: 'updateProject',
  props: ({ updateProject }) => ({
    updateProject: ({ id, title, description, timeZone, language }) =>
      updateProject({
        variables: { id, title, description, timeZone, language },
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
        refetchQueries: ['myProjects'],
        update: invalidateStore
      })
  })
});

export default comp =>
  compose(
    withProject,
    withTimeZones,
    withLanguages,
    withUpdateProject,
    withDeleteProject
  )(comp);
