import PropTypes from 'prop-types';
import Dialog from '../components/Dialog';
import withData from '../libraries/withData';
import App from '../components/App';

const dialog = props => {
  const { router } = props;
  const { dialogId, projectId } = router.url.query;
  return (
    <App>
      <Dialog dialogId={dialogId} projectId={projectId} />
    </App>
  );
};

dialog.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(dialog);
