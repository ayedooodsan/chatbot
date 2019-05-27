import { graphql, compose } from 'react-apollo';
import exportProjectGql from './exportProject.gql';
import importProjectGql from './importProject.gql';
import invalidateStore from '../../../libraries/updateApolloCache/invalidateStore';

const withExportProject = graphql(exportProjectGql, {
  name: 'exportProject',
  props: ({ exportProject }) => ({
    exportProject: ({ id }) =>
      exportProject({
        variables: { id },
        refetchQueries: ['myProjects']
      })
  })
});

const withImportProject = graphql(importProjectGql, {
  name: 'importProject',
  props: ({ importProject }) => ({
    importProject: ({ id, file }) =>
      importProject({
        variables: { id, file },
        refetchQueries: ['myProjects'],
        update: invalidateStore
      })
  })
});

export default comp =>
  compose(
    withExportProject,
    withImportProject
  )(comp);
