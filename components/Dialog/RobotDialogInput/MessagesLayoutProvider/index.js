import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Delete from '@material-ui/icons/Delete';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

const MessagesLayoutProvider = props => {
  const { messageTypes, messageInitialValues, classes, renderMessage } = props;
  const [messages, setMessages] = useState(props.messages);
  const [messageTypeEl, setMessageTypeEl] = React.useState(null);

  const openMessageTypes = event => {
    setMessageTypeEl(event.currentTarget);
  };

  const closeMessageTypes = () => {
    setMessageTypeEl(null);
  };

  const swapMessage = (fromIndex, destinationIndex) => {
    const tempMessage = messages[fromIndex];
    messages[fromIndex] = messages[destinationIndex];
    messages[destinationIndex] = tempMessage;
    setMessages(messages);
  };

  const addMessage = messageTypeValue => {
    messages.push(messageInitialValues[messageTypeValue]);
    setMessages(messages);
  };

  return (
    <div className={classes.root}>
      {messages.map((message, index) => (
        <div className={classes.message}>
          <div className={classes.messageAction}>
            <Fab size="small" className={classes.margin}>
              <Delete />
            </Fab>
            {index === 0 && (
              <Fab
                size="small"
                className={classes.margin}
                onClick={() => swapMessage(index, index - 1)}
              >
                <ArrowUpward />
              </Fab>
            )}
            {index === messages.length - 1 && (
              <Fab
                size="small"
                className={classes.margin}
                onClick={() => swapMessage(index, index + 1)}
              >
                <ArrowDownward />
              </Fab>
            )}
          </div>
          {renderMessage(message)}
        </div>
      ))}
      <Button
        aria-owns={messageTypeEl ? 'message-types' : undefined}
        aria-haspopup="true"
        onClick={openMessageTypes}
      >
        Open Menu
      </Button>
      <Menu
        id="message-types"
        anchorEl={messageTypeEl}
        open={Boolean(messageTypeEl)}
        onClose={closeMessageTypes}
      >
        {messageTypes.map(messageType => (
          <MenuItem onClick={() => addMessage(messageType.value)}>
            {messageType.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

MessagesLayoutProvider.defaultProps = {
  messages: []
};

MessagesLayoutProvider.propTypes = {
  renderMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  messageTypes: PropTypes.array.isRequired,
  messageInitialValues: PropTypes.object.isRequired,
  messages: PropTypes.array
};

export default MessagesLayoutProvider;
