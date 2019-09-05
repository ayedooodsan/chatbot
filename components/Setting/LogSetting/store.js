import { graphql, compose } from 'react-apollo';
import myIntegrationsGql from './myIntegrations.gql';
import updateIntegrationGql from './updateIntegration.gql';

const withMyIntegrations = graphql(myIntegrationsGql, {
  name: 'myIntegrations',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ myIntegrations: { loading, myIntegrations, error } }) => {
    if (error) {
      return {
        loading,
        myIntegrations: []
      };
    }
    return {
      loading,
      myIntegrations,
      error
    };
  }
});

const withUpdateIntegration = graphql(updateIntegrationGql, {
  name: 'updateIntegration',
  props: ({ updateIntegration }) => ({
    updateIntegration: ({ id, vendor, setting }) =>
      updateIntegration({
        variables: { id, vendor, setting },
        refetchQueries: ['myIntegrations']
      })
  })
});

export default comp =>
  compose(
    withMyIntegrations,
    withUpdateIntegration
  )(comp);
