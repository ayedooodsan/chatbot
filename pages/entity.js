import PropTypes from 'prop-types';
import Entity from '../components/Entity';
import withData from '../libraries/withData';
import App from '../components/App';

const entity = props => {
  const { router } = props;
  const { entityId, projectId } = router.url.query;
  return (
    <App>
      <Entity entityId={entityId} projectId={projectId} />
    </App>
  );
};

entity.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(entity);
