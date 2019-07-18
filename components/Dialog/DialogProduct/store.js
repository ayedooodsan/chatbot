import { graphql, compose } from 'react-apollo';
import dialogGql from './dialog.gql';
import deleteDialogGql from './deleteDialog.gql';
import updateDialogGql from './updateDialog.gql';
import updateDialogQuery from '../MyDialogs/updateDialogQuery';

const withDialog = graphql(dialogGql, {
  name: 'dialog',
  options: props => ({
    variables: {
      id: props.dialogId
    }
  }),
  props: ({ dialog: { loading, dialog, error } }) => {
    if (error) {
      return {
        loading,
        dialog: {}
      };
    }
    return {
      loading,
      dialog,
      error
    };
  }
});

const withUpdateDialog = graphql(updateDialogGql, {
  name: 'updateDialog',
  props: ({ updateDialog }) => ({
    updateDialog: ({ id, messages, title }) =>
      updateDialog({
        variables: { id, messages, title },
        refetchQueries: ['myDialogs', 'dialog', 'project']
      })
  })
});

const withDeleteDialog = graphql(deleteDialogGql, {
  name: 'deleteDialog',
  props: ({ deleteDialog }) => ({
    deleteDialog: ({ id }) =>
      deleteDialog({
        variables: { id },
        refetchQueries: ['myDialogs', 'project'],
        update: updateDialogQuery
      })
  })
});

export default comp =>
  compose(
    withDialog,
    withUpdateDialog,
    withDeleteDialog
  )(comp);
