import PropTypes from 'prop-types';
import Training from '../components/Training';
import App from '../components/App';
import withData from '../libraries/withData';

const training = props => {
  const { router } = props;
  const { trainingId, projectId } = router.url.query;
  return (
    <App>
      <Training trainingId={trainingId} projectId={projectId} />
    </App>
  );
};

training.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(training);
