import PropTypes from 'prop-types';
import Dialog from '../components/Dialog';
import withData from '../libraries/withData';

const dialog = props => {
  const { router } = props;
  const { dialogId, projectId } = router.url.query;
  return <Dialog dialogId={dialogId} projectId={projectId} />;
};

dialog.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(dialog);
