import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Reply from '@material-ui/icons/Reply';

import {
  REPLY_USER,
  REPLY_USER_PARAM,
  EDIT_USER,
  DELETE_USER,
  EDIT_USER_PARAM,
  DELETE_USER_PARAM
} from '../DialogInput/constant';
import BubbleChat from '../BubbleChat';
import style from './style';

const UserMessage = props => {
  const [activeParamName, setActiveParamName] = useState(null);
  const {
    messages,
    activeMessageId,
    activeChildMessageId,
    onChangeActiveMessage,
    onChangeChildActiveMessage,
    onChangeDialogInput,
    classes
  } = props;

  useEffect(
    function activeParamChange() {
      if (activeParamName !== null) {
        onChangeChildActiveMessage(null);
      }
    },
    [activeParamName]
  );

  const activeMessage = messages.find(
    message => message.id === activeMessageId
  );

  const requiredParams = activeMessage.params.filter(param => param.required);

  let activeParam;
  if (activeParamName !== null) {
    activeParam = requiredParams.find(param => param.name === activeParamName);
  }

  const replyable = () =>
    !activeChildMessageId || (activeParamName && !activeParam.prompt);
  return (
    <React.Fragment>
      {messages.length > 1 && (
        <div className={classes.chipContainer}>
          {messages.map(message =>
            message.id === activeMessageId ? (
              <Chip
                key={message.title}
                label={message.title}
                className={classes.chip}
                color="primary"
              />
            ) : (
              <Chip
                key={message.title}
                label={message.title}
                className={classes.chip}
                variant="outlined"
                onClick={() => {
                  if (activeParamName !== null) {
                    onChangeChildActiveMessage(activeChildMessageId);
                    setActiveParamName(null);
                  }
                  onChangeActiveMessage(message.id);
                  onChangeDialogInput({});
                }}
              />
            )
          )}
        </div>
      )}
      <BubbleChat type="other">
        <React.Fragment>
          <div className={classes.headerBubble}>
            <Typography variant="subtitle2" color="primary">
              {activeMessage.title}
            </Typography>
            <div className={classes.buttons}>
              {replyable() && (
                <IconButton
                  className={classes.iconButton}
                  onClick={() => {
                    if (activeParamName === null) {
                      onChangeDialogInput({
                        type: REPLY_USER,
                        payload: activeMessage
                      });
                    } else {
                      onChangeDialogInput({
                        type: REPLY_USER_PARAM,
                        payload: {
                          message: activeMessage,
                          param: activeParam
                        }
                      });
                    }
                  }}
                >
                  <Reply className={classes.miniIcon} />
                </IconButton>
              )}
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  onChangeDialogInput({
                    type: EDIT_USER,
                    payload: activeMessage
                  });
                }}
              >
                <Edit className={classes.miniIcon} />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  onChangeDialogInput({
                    type: DELETE_USER,
                    payload: activeMessage
                  });
                }}
              >
                <Delete className={classes.miniIcon} />
              </IconButton>
            </div>
          </div>
          <Typography variant="subtitle2">
            {activeMessage.intent.title} INTENT
          </Typography>
          {activeMessage.intent.values && (
            <ul className={classes.intentValues}>
              {activeMessage.intent.values.map(value => (
                <li key={value.text}>
                  <Typography variant="caption">{value.text}</Typography>
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      </BubbleChat>
      {requiredParams.length > 0 && (
        <div className={classes.chipContainer}>
          {!activeParamName ? (
            <Chip
              label="Satisfied"
              className={classes.chip}
              icon={<Done />}
              color="primary"
            />
          ) : (
            <Chip
              variant="outlined"
              icon={<Done />}
              label="Satisfied"
              className={classes.chip}
              onClick={() => {
                onChangeChildActiveMessage(activeChildMessageId);
                onChangeDialogInput({});
                setActiveParamName(null);
              }}
            />
          )}
          {requiredParams.map(param =>
            param.name === activeParamName ? (
              <Chip
                icon={<ErrorOutline />}
                key={param.name}
                label={param.name}
                className={classes.chip}
                color="primary"
              />
            ) : (
              <Chip
                variant="outlined"
                key={param.name}
                icon={<ErrorOutline />}
                label={param.name}
                className={classes.chip}
                onClick={() => {
                  onChangeDialogInput({});
                  setActiveParamName(param.name);
                }}
              />
            )
          )}
        </div>
      )}
      {activeParamName && activeParam.prompt && (
        <BubbleChat type="self">
          <div className={classes.headerBubble}>
            <Typography variant="caption">{activeParam.prompt}</Typography>
            <div className={classes.buttons}>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  onChangeDialogInput({
                    type: EDIT_USER_PARAM,
                    payload: {
                      message: activeMessage,
                      param: activeParam
                    }
                  });
                }}
              >
                <Edit className={classes.miniIcon} />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                onClick={() => {
                  onChangeDialogInput({
                    type: DELETE_USER_PARAM,
                    payload: {
                      message: activeMessage,
                      param: activeParam
                    }
                  });
                }}
              >
                <Delete className={classes.miniIcon} />
              </IconButton>
            </div>
          </div>
        </BubbleChat>
      )}
    </React.Fragment>
  );
};

UserMessage.defaultProps = {
  activeMessageId: null,
  activeChildMessageId: null
};

UserMessage.propTypes = {
  messages: PropTypes.array.isRequired,
  onChangeActiveMessage: PropTypes.func.isRequired,
  onChangeChildActiveMessage: PropTypes.func.isRequired,
  onChangeDialogInput: PropTypes.func.isRequired,
  activeMessageId: PropTypes.string,
  activeChildMessageId: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(UserMessage);
