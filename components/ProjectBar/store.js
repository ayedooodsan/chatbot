import { graphql, compose } from 'react-apollo';
import getMyProjects from './getMyProjects.gql';
import createProject from './createProject.gql';

const withData = graphql(getMyProjects, {
  props: ({ data: { loading, myProjects, error } }) => ({
    loading,
    myProjects,
    error
  })
});

const withMutation = graphql(createProject, {
  props: ({ mutate }) => ({
    mutations: {
      getMyProjects: () => mutate()
    }
  })
});

export default comp => {
  const compWithApollo = compose(
    withData,
    withMutation
  )(comp);
  return compWithApollo;
};
