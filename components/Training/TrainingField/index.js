import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
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
  const { onChange, classes, initialValue, router, number } = props;
  const { projectId } = router.query;
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { text, entityRanges, params, intentResult, actionStatus } = state;

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
        entity: entityMap[entityRange.key].data.entity,
        paramKey: entityMap[entityRange.key].data.paramKey
      }))
    };
    const addedEntity = {};
    const newParams = newTraining.entityRanges.reduce(
      (currentParams, entityRange) => {
        const { entity, paramKey } = entityRange;
        if (!addedEntity[paramKey]) {
          const foundEntity = params.find(param => param.key === paramKey);
          if (foundEntity) {
            currentParams.push(foundEntity);
          } else {
            currentParams.push({
              name: '',
              entity,
              key: paramKey
            });
          }
        }
        addedEntity[paramKey] = true;
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

  const onChangeParam = (name, index) => {
    params[index].name = name;
    dispatch({
      type: ON_CHANGE_PARAMS,
      payload: { params }
    });
  };

  const onDeleteParam = index => {
    const [deletedParam] = params.splice(index, 1);
    const newEntityRanges = entityRanges.filter(
      entityRange => entityRange.paramKey !== deletedParam.key
    );
    dispatch({
      type: ON_CHANGE_USER_SAY,
      payload: {
        text,
        entityRanges: newEntityRanges,
        params
      }
    });
  };

  const onChangeAction = newActionStatus => {
    dispatch({
      type: ON_CHANGE_ACTION_STATUS,
      payload: {
        actionStatus: newActionStatus
      }
    });
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={1}>
        <div className={classes.fieldContainer}>
          <Typography variant="subtitle2" className={classes.fieldName}>
            #{number} USER SAY
          </Typography>
          <IntenEditor
            key={params.length}
            className={classes.intentEditor}
            initialValue={{ text, entityRanges }}
            params={params}
            onChange={onPushUserSay}
          />
          {params.map((param, index) => (
            <ParamEditor
              key={param.entity.id}
              initialValue={param}
              onChange={name => onChangeParam(name, index)}
              onDelete={() => onDeleteParam(index)}
            />
          ))}
          <Typography variant="subtitle2" className={classes.fieldName}>
            INTENT RESULT
          </Typography>
          <SimpleAutoComplete
            className={classes.noMarginTop}
            onChange={onChangeIntentResult}
            placeholder="Intent"
            initialInputValue={intentResult === null ? '' : intentResult.title}
            initialValue={intentResult}
            error={intentResult === null ? false : !intentResult.title}
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
          {intentResult && (
            <Tooltip
              title={`Add to intent "${intentResult.title}"`}
              placement="left"
            >
              <IconButton
                className={classNames(classes.iconButton, {
                  [classes.selectedCheck]: actionStatus === 'Check'
                })}
                aria-label="Check"
                onClick={() => {
                  onChangeAction('Check');
                }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            className={classNames(classes.iconButton, {
              [classes.selectedDelete]: actionStatus === 'Delete'
            })}
            aria-label="Delete"
            onClick={() => {
              onChangeAction('Delete');
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    </React.Fragment>
  );
};

TrainingField.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired
};

export default withStyles(style)(withRouter(TrainingField));
