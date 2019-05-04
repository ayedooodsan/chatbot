import PropTypes from 'prop-types';
import ParamEditor from '../../common/ParamEditor';

const ParamField = props => {
  const { initialValue, onDelete, onChange, updateIntents } = props;

  const onUpdateIntents = () => {
    updateIntents((intents, params) => {
      const mewIntents = intents.map(intent => ({
        text: intent.text,
        entityRanges: intent.entityRanges.filter(entityRange => {
          const foundEntity = params.find(
            param => entityRange.entity.id === param.entity.id
          );
          return foundEntity !== undefined;
        })
      }));
      return mewIntents;
    });
  };

  const onParamDelete = () => {
    onDelete(onUpdateIntents);
  };

  return (
    <ParamEditor
      onDelete={onParamDelete}
      onChange={name => {
        onChange(name, 'name');
      }}
      initialValue={initialValue}
    />
  );
};

ParamField.defaultProps = {
  initialValue: {
    entity: {}
  }
};

ParamField.propTypes = {
  initialValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  updateIntents: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default ParamField;
