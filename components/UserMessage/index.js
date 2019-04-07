import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/Done';
import Warning from '@material-ui/icons/Warning';

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
  const activeMessage = messages.find(
    message => message.id === activeMessageId
  );
  const requiredParams = activeMessage.intent.params.filter(
    param => param.required
  );
  console.log('requiredParams', requiredParams);
  let activeParam;
  if (activeParamName !== null) {
    activeParam = activeMessage.intent.params.find(
      param => param.name === activeParamName
    );
    onChangeChildActiveMessage(null);
  }
  return (
    <React.Fragment>
      {messages.length > 1 && (
        <div>
          {messages.map(message =>
            message.id === activeMessage ? (
              <Chip label={message.title} className={classes.chip} />
            ) : (
              <Chip
                label={message.title}
                className={classes.chip}
                variant="outlined"
                onClick={() => {
                  onChangeActiveMessage(message.id);
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
        <div>
          {!activeParamName ? (
            <Chip
              label="Satisfied"
              className={classes.chip}
              deleteIcon={<Done />}
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
                icon={<Warning />}
                label={param.name}
                className={classes.chip}
              />
            ) : (
              <Chip
                variant="outlined"
                icon={<Warning />}
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
      {activeParamName && (
        <BubbleChat type="other">
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
