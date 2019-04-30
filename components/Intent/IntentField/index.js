import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'next/router';
import _ from 'lodash';
import IntentEditor from '../../common/IntentEditor';
import style from './style';

const IntentField = props => {
  const { onDelete, onChange, classes, initialValue, updateParams } = props;

  const onUpdateParams = () => {
    updateParams((intents, params) => {
      const addedSubProduct = {};
      const newParams = intents.reduce((currentParams, intent) => {
        intent.entityRanges.forEach(entityRange => {
          const { entity } = entityRange;
          if (!addedSubProduct[entity.id]) {
            const foundSubProduct = params.find(
              subProduct => subProduct.entity.id === entity.id
            );
            if (foundSubProduct) {
              currentParams.push(foundSubProduct);
            } else {
              currentParams.push({
                name: entity.title,
                entity
              });
            }
            addedSubProduct[entity.id] = true;
          }
        });
        return currentParams;
      }, []);
      return newParams;
    });
  };

  const onPushIntent = rawEditorState => {
    const newBlock = rawEditorState.blocks[0];
    const { entityMap } = rawEditorState;
    const newIntent = {
      text: newBlock.text,
      entityRanges: newBlock.entityRanges.map(entityRange => ({
        offset: entityRange.offset,
        length: entityRange.length,
        entity: entityMap[entityRange.key].data.entity
      }))
    };
    if (!_.isEqual(initialValue, newIntent)) {
      onChange(newIntent, null, onUpdateParams);
    }
  };

  const onIntentDelete = () => {
    onDelete(onUpdateParams);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <IntentEditor initialValue={initialValue} onChange={onPushIntent} />
        <IconButton
          onClick={onIntentDelete}
          className={classes.iconButton}
          aria-label="Delete"
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
};

IntentField.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  updateParams: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(IntentField));
