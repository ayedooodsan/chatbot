import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../../redux/projectSetting';
import myIntegrationsGql from './myIntegrations.gql';
import updateIntegrationGql from './updateIntegration.gql';
import updateWebhookProjectGql from './updateWebhookProject.gql';
import webhookProjectGql from './webhookProject.gql';

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
    updateIntegration: ({ id, vendor, setting, status }) =>
      updateIntegration({
        variables: { id, vendor, setting, status },
        refetchQueries: ['myIntegrations']
      })
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    setNLPStatus(NLPStatus) {
      dispatch(dispatchers.setNLPStatus(NLPStatus));
    }
  }
});

const withUpdateWebhookProject = graphql(updateWebhookProjectGql, {
  name: 'updateWebhookProject',
  props: ({ updateWebhookProject }) => ({
    updateWebhookProject: ({
      id,
      webhookUrl,
      webhookUsername,
      webhookAvailable,
      gatewayUrl,
      basicAuthUsername,
      basicAuthPassword,
      timeoutMessage
    }) =>
      updateWebhookProject({
        variables: {
          id,
          webhookUrl,
          webhookUsername,
          webhookAvailable,
          gatewayUrl,
          basicAuthUsername,
          basicAuthPassword,
          timeoutMessage
        },
        refetchQueries: ['myProjects', 'project']
      })
  })
});

const withProject = graphql(webhookProjectGql, {
  name: 'webhookProject',
  options: props => ({
    variables: {
      id: props.projectId
    }
  }),
  props: ({ webhookProject: { loading, project, error } }) => {
    if (error) {
      return {
        loading,
        project: {}
      };
    }
    return {
      loading,
      webhookProject: project,
      error
    };
  }
});

export default comp => {
  const compWithApollo = compose(
    withMyIntegrations,
    withUpdateIntegration,
    withUpdateWebhookProject,
    withProject
  )(comp);
  return connect(
    null,
    mapDispatchToProps
  )(compWithApollo);
};
