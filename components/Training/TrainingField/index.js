import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import SimpleAutoComplete from '../SimpleAutoComplete';
import IntentSuggestions from '../../common/IntentSuggestions';
import ParamEditor from '../../common/ParamEditor';
import IntenEditor from '../../common/IntentEditor';
import style from './style';

const ON_CHANGE_ACTION_STATUS = 'ON_CHANGE_ACTION_STATUS';
const ON_CHANGE_USER_SAY = 'ON_CHANGE_USER_SAY';
const ON_CHANGE_PARAMS = 'ON_CHANGE_PARAMS';
const ON_CHANGE_INTENT_RESULT = 'ON_CHANGE_INTENT_RESULT';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ON_CHANGE_ACTION_STATUS: {
      const { actionStatus } = payload;
      return { ...state, actionStatus };
    }
    case ON_CHANGE_USER_SAY: {
      const { text, entityRanges, params } = payload;
      return { ...state, text, entityRanges, params };
    }
    case ON_CHANGE_PARAMS: {
      const { params } = payload;
      return { ...state, params };
    }
    case ON_CHANGE_INTENT_RESULT: {
      const { intentResult } = payload;
      return { ...state, intentResult };
    }
    default:
      return state;
  }
};

const TrainingField = props => {
  const { onDelete, onChange, classes, initialValue, router } = props;
  const { projectId } = router.query;
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { text, entityRanges, params, intentResult } = state;
  const onUpdateParams = () => {
    console.log('on udpate params');
  };

  useEffect(() => {
    onChange(state);
  }, [state]);

  const onPushUserSay = rawEditorState => {
    const newBlock = rawEditorState.blocks[0];
    const { entityMap } = rawEditorState;
    const newTraining = {
      text: newBlock.text,
      entityRanges: newBlock.entityRanges.map(entityRange => ({
        offset: entityRange.offset,
        length: entityRange.length,
        entity: entityMap[entityRange.key].data.entity
      }))
    };
    const addedEntity = {};
    const newParams = newTraining.entityRanges.reduce(
      (currentParams, entityRange) => {
        const { entity } = entityRange;
        if (addedEntity[entity.id]) {
          const foundEntity = params.find(
            param => param.entity.id === entity.id
          );
          if (foundEntity) {
            currentParams.push(foundEntity);
          } else {
            currentParams.push({
              name: entity.title,
              entity
            });
          }
        }
        addedEntity[entity.id] = true;
        return currentParams;
      },
      []
    );
    newTraining.params = newParams;
    dispatch({
      type: ON_CHANGE_USER_SAY,
      payload: newTraining
    });
  };

  const onChangeIntentResult = newIntentResult => {
    const { id, title } = newIntentResult;
    dispatch({
      type: ON_CHANGE_INTENT_RESULT,
      payload: {
        intentResult: { id, title }
      }
    });
  };

  const onChangeParam = () => null;
  const onDeleteParam = () => null;

  const onTrainingDelete = () => {
    onDelete(onUpdateParams);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <div className={classes.fieldContainer}>
          <Typography variant="subtitle2" className={classes.fieldName}>
            USER SAY
          </Typography>
          <IntenEditor
            className={classes.intentEditor}
            initialValue={{ text, entityRanges }}
            onChange={onPushUserSay}
          />
          {params.map(param => (
            <ParamEditor
              key={param.entity.id}
              initialValue={param}
              onChange={onChangeParam}
              onDelete={onDeleteParam}
            />
          ))}
          <Typography variant="subtitle2" className={classes.fieldName}>
            INTENT RESULT
          </Typography>
          <SimpleAutoComplete
            className={classes.noMarginTop}
            onChange={onChangeIntentResult}
            placeholder="Intent"
            initialValue={intentResult.title}
            error={!intentResult.title}
            suggestions={(inputValue, children) => {
              return (
                <IntentSuggestions projectId={projectId} keyword={inputValue}>
                  {children}
                </IntentSuggestions>
              );
            }}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Typography variant="body2" className={classes.fieldName}>
            ACTION
          </Typography>
          <IconButton
            onClick={onTrainingDelete}
            className={classes.iconButton}
            aria-label="Check"
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            onClick={onTrainingDelete}
            className={classes.iconButton}
            aria-label="Delete"
          >
            <CancelIcon />
          </IconButton>
        </div>
      </Paper>
    </React.Fragment>
  );
};

TrainingField.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(TrainingField));
