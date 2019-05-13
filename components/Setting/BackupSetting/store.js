import { graphql, compose } from 'react-apollo';
import exportProjectGql from './exportProject.gql';

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

export default comp => compose(withExportProject)(comp);
