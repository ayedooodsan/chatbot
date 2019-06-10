import PropTypes from 'prop-types';
import App from '../components/App';
import Setting from '../components/Setting';
import withData from '../libraries/withData';

const setting = props => {
  const { router } = props;
  const { settingType, projectId } = router.url.query;
  return (
    <App>
      <Setting settingType={settingType} projectId={projectId} />
    </App>
  );
};

setting.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(setting);
