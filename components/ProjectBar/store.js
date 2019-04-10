import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../redux/auth';
import getMyProjects from './getMyProjects.gql';
// import createProject from './createProject.gql';

const withData = graphql(getMyProjects, {
  props: ({ data: { loading, myProject, error } }) => ({
    loading,
    myProject,
    error
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signIn(token) {
      dispatch(dispatchers.signIn(token));
    }
  }
});

export default comp => {
  const compWithApollo = compose(
    withData
    // withMutation
  )(comp);
  return connect(
    null,
    mapDispatchToProps
  )(compWithApollo);
};
