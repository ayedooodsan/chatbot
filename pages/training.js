import PropTypes from 'prop-types';
import Training from '../components/Training';
import withData from '../libraries/withData';

const training = props => {
  const { router } = props;
  const { trainingId, projectId } = router.url.query;
  return <Training trainingId={trainingId} projectId={projectId} />;
};

training.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(training);
