import { graphql, compose } from 'react-apollo';
import getMyDialogsGql from './myDialogs.gql';
import createDialogGql from './createDialog.gql';

const withCreateDialog = graphql(createDialogGql, {
  name: 'createDialog',
  props: ({ createDialog }) => ({
    createDialog: ({ title, projectId }) =>
      createDialog({
        variables: { title, projectId },
        refetchQueries: ['myDialogs']
      })
  })
});

const withMyDialogs = graphql(getMyDialogsGql, {
  name: 'myDialogs',
  options: props => ({
    variables: {
      projectId: props.projectId
    }
  }),
  props: ({ myDialogs: { loading, myDialogs, error } }) => ({
    loading,
    myDialogs,
    error
  })
});

export default comp =>
  compose(
    withCreateDialog,
    withMyDialogs
  )(comp);
