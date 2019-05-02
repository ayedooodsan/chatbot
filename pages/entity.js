import PropTypes from 'prop-types';
import Entity from '../components/Entity';
import withData from '../libraries/withData';

const entity = props => {
  const { router } = props;
  const { entityId, projectId } = router.url.query;
  return <Entity entityId={entityId} projectId={projectId} />;
};

entity.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(entity);
