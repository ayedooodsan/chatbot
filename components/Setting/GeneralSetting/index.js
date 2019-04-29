import PropTypes from 'prop-types';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';

const GeneralSetting = props => {
  const { projectId } = props;
  console.log(projectId);
  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="General Setting" />}
      product={() => <SimpleProductBody>Cek</SimpleProductBody>}
      onSave={() => null}
    />
  );
};

GeneralSetting.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default GeneralSetting;
