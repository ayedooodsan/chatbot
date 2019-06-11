import { graphql, compose } from 'react-apollo';
import createDialogGql from './createDialog.gql';
import updateDialogQuery from './MyDialogs/updateDialogQuery';

const withCreateDialog = graphql(createDialogGql, {
  name: 'createDialog',
  props: ({ createDialog }) => ({
    createDialog: ({ title, projectId }) =>
      createDialog({
        variables: { title, projectId },
        refetchQueries: ['myDialogs'],
        update: updateDialogQuery
      })
  })
});

export default comp => compose(withCreateDialog)(comp);
