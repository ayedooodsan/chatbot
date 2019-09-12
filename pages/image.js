import PropTypes from 'prop-types';
import Image from '../components/Image';
import withData from '../libraries/withData';
import App from '../components/App';

const image = props => {
  const { router } = props;
  const { projectId } = router.url.query;
  return (
    <App>
      <Image projectId={projectId} />
    </App>
  );
};

image.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(image);
