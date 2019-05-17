import PropTypes from 'prop-types';
import Analytic from '../components/Analytic';
import withData from '../libraries/withData';
import App from '../components/App';

const analytic = props => {
  const { router } = props;
  const { projectId } = router.url.query;
  return (
    <App>
      <Analytic projectId={projectId} />
    </App>
  );
};

analytic.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(analytic);
