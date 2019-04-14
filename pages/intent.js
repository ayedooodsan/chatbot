import PropTypes from 'prop-types';
import Intent from '../components/Intent';
import withData from '../libraries/withData';

const intent = props => {
  const { router } = props;
  const { inetntId, projectId } = router.url.query;
  return <Intent inetntId={inetntId} projectId={projectId} />;
};

intent.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(intent);
