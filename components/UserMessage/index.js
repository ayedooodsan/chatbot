import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/Done';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

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
    // onChangeEditableMessage,
    classes
  } = props;

  useEffect(() => {
    if (activeParamName !== null) {
      onChangeChildActiveMessage(null);
    }
  }, [activeParamName]);

  const activeMessage = messages.find(
    message => message.id === activeMessageId
  );

  const requiredParams = activeMessage.intent.params.filter(
    param => param.required
  );

  let activeParam;
  if (activeParamName !== null) {
    activeParam = activeMessage.intent.params.find(
      param => param.name === activeParamName
    );
  }

  return (
    <React.Fragment>
      {messages.length > 1 && (
        <div className={classes.chipContainer}>
          {messages.map(message =>
            message.id === activeMessageId ? (
              <Chip
                label={message.title}
                className={classes.chip}
                color="primary"
              />
            ) : (
              <Chip
                label={message.title}
                className={classes.chip}
                variant="outlined"
                onClick={() => {
                  onChangeActiveMessage(message.id);
                  if (setActiveParamName !== null) {
                    onChangeChildActiveMessage(activeChildMessageId);
                    setActiveParamName(null);
                  }
                }}
              />
            )
          )}
        </div>
      )}
      <BubbleChat type="other">
        <Typography variant="caption">{activeMessage.title}</Typography>
        <Typography variant="caption">{activeMessage.intent.name}</Typography>
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
                setActiveParamName(null);
              }}
            />
          )}
          {requiredParams.map(param =>
            param.name === activeParamName ? (
              <Chip
                icon={<ErrorOutline style={{ color: 'rgba(0, 0, 0, 0.87)' }} />}
                label={param.name}
                className={classes.chip}
                color="primary"
              />
            ) : (
              <Chip
                variant="outlined"
                icon={<ErrorOutline style={{ color: 'rgba(0, 0, 0, 0.87)' }} />}
                label={param.name}
                className={classes.chip}
                onClick={() => {
                  setActiveParamName(param.name);
                }}
              />
            )
          )}
        </div>
      )}
      {activeParamName && activeParam.message && (
        <BubbleChat type="self">
          <Typography variant="caption">{activeParam.message}</Typography>
        </BubbleChat>
      )}
    </React.Fragment>
  );
};

UserMessage.propTypes = {
  messages: PropTypes.array.isRequired,
  activeMessageId: PropTypes.number.isRequired,
  activeChildMessageId: PropTypes.number.isRequired,
  onChangeActiveMessage: PropTypes.func.isRequired,
  onChangeChildActiveMessage: PropTypes.func.isRequired,
  onChangeEditableMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(UserMessage);
