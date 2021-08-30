import { graphql, compose } from 'react-apollo';
import saveQisqusIntegrationQql from './saveQisqusIntegration.gql';

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

export default comp => compose(withQisqusIntegration)(comp);
