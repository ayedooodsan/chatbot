import { graphql, compose } from 'react-apollo';
import myProjectsGql from './myProjects.gql';
import createProjectGql from './createProject.gql';

const withMyProjects = graphql(myProjectsGql, {
  name: 'myProjects',
  props: ({ myProjects: { loading, myProjects, error } }) => ({
    loading,
    myProjects,
    error
  })
});

const withCreateProject = graphql(createProjectGql, {
  name: 'createProject',
  props: ({ createProject }) => ({
    createProject: ({ title }) =>
      createProject({
        variables: { title },
        refetchQueries: ['myProjects']
      })
  })
});

export default comp =>
  compose(
    withMyProjects,
    withCreateProject
  )(comp);
