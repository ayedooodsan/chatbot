import { graphql, compose } from 'react-apollo';
import saveQisqusIntegrationQql from './saveQisqusIntegration.gql';
import myIntegrationsGql from './myIntegrations.gql';

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

const withQisqusIntegration = graphql(saveQisqusIntegrationQql, {
  name: 'saveQisqusIntegration',
  props: ({ saveQisqusIntegration }) => ({
    saveQisqusIntegration: ({
      projectId,
      dialogflowProjectId,
      qiscusAccountEmail,
      qiscusAccountPassword,
      qiscusAppId,
      secretKeyBot,
      senderEmail
    }) =>
      saveQisqusIntegration({
        variables: {
          projectId,
          dialogflowProjectId,
          qiscusAccountEmail,
          qiscusAccountPassword,
          qiscusAppId,
          secretKeyBot,
          senderEmail
        },
        refetchQueries: ['myIntegrations']
      })
  })
});

export default comp =>
  compose(
    withQisqusIntegration,
    withMyIntegrations
  )(comp);
