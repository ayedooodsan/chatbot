import { graphql, compose } from 'react-apollo';
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

export default comp => compose(withCreateDialog)(comp);
