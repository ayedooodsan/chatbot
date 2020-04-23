import { graphql, compose } from 'react-apollo';
import downloadHistoriesGql from './downloadHistories.gql';

const withDownloadHistories = graphql(downloadHistoriesGql, {
  name: 'downloadHistories',
  props: ({ downloadHistories }) => ({
    downloadHistories: ({ projectId, startDate, endDate }) =>
      downloadHistories({
        variables: { projectId, startDate, endDate }
      })
  })
});

export default comp => compose(withDownloadHistories)(comp);
