import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../redux/auth';
import myProjectsGql from './myProjects.gql';
import createProjectGql from './createProject.gql';
import updateActiveProjectGql from './updateActiveProject.gql';
import invalidateStore from '../../libraries/updateApolloCache/invalidateStore';

const withMyProjects = graphql(myProjectsGql, {
  name: 'myProjects',
  props: ({ myProjects: { loading, myProjects, error, refetch } }) => ({
    loading,
    myProjects,
    refetchMyProject: refetch,
    error
  })
});

const withCreateProject = graphql(createProjectGql, {
  name: 'createProject',
  props: ({ createProject }) => ({
    createProject: ({ title }) =>
      createProject({
        variables: { title }
      })
  })
});

const withUpdateActiveProjectGql = graphql(updateActiveProjectGql, {
  name: 'updateActiveProject',
  props: ({ updateActiveProject }) => ({
    updateActiveProject: ({ id }) =>
      updateActiveProject({
        variables: { id },
        refetch: [{ query: myProjectsGql }],
        update: invalidateStore
      })
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    setProjectRole(token, refreshToken) {
      dispatch(dispatchers.setProjectRole(token, refreshToken));
    }
  }
});

export default comp => {
  const compWithApollo = compose(
    withMyProjects,
    withCreateProject,
    withUpdateActiveProjectGql
  )(comp);
  return connect(
    null,
    mapDispatchToProps
  )(compWithApollo);
};
