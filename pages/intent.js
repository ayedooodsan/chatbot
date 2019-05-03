import PropTypes from 'prop-types';
import Intent from '../components/Intent';
import withData from '../libraries/withData';
import App from '../components/App';

const intent = props => {
  const { router } = props;
  const { intentId, projectId } = router.url.query;
  return (
    <App>
      <Intent intentId={intentId} projectId={projectId} />
    </App>
  );
};

intent.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(intent);
