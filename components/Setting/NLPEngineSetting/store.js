import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../../../redux/projectSetting';
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

export default comp => {
  const compWithApollo = compose(
    withMyIntegrations,
    withUpdateIntegration
  )(comp);
  return connect(
    null,
    mapDispatchToProps
  )(compWithApollo);
};
