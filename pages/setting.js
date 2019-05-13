import PropTypes from 'prop-types';
import Setting from '../components/Setting';
import withData from '../libraries/withData';

const setting = props => {
  const { router } = props;
  const { settingType, projectId } = router.url.query;
  return <Setting settingType={settingType} projectId={projectId} />;
};

setting.propTypes = {
  router: PropTypes.object.isRequired
};

export default withData(setting);
