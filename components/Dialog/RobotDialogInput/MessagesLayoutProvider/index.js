import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Delete from '@material-ui/icons/Delete';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const MessagesLayoutProvider = props => {
  const {
    messageTypes,
    initialMessageValue,
    classes,
    renderMessage,
    onChange
  } = props;
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
    setMessages([...messages]);
  };

  const addMessage = messageTypeValue => {
    messages.push(initialMessageValue(messageTypeValue));
    setMessages([...messages]);
    closeMessageTypes();
  };

  const changeMessage = (message, index) => {
    messages[index] = message;
    setMessages([...messages]);
  };

  const deleteMessage = index => {
    messages.splice(index, 1);
    setMessages([...messages]);
  };

  useEffect(() => {
    onChange(messages);
  }, [messages]);

  return (
    <div className={classes.root}>
      {messages.map((message, index) => (
        <div className={classes.message} key={message.key}>
          <div className={classes.messageAction}>
            <Fab
              onClick={() => {
                deleteMessage(index);
              }}
              classes={{
                sizeSmall: classes.fabSmallSize,
                root: classes.fabRoot
              }}
              disableRipple
              size="small"
              className={classes.fab}
            >
              <Delete fontSize="small" />
            </Fab>
            {index !== 0 && (
              <Fab
                classes={{
                  sizeSmall: classes.fabSmallSize,
                  root: classes.fabRoot
                }}
                disableRipple
                size="small"
                className={classes.fab}
                onClick={() => swapMessage(index, index - 1)}
              >
                <ArrowUpward fontSize="small" />
              </Fab>
            )}
            {index !== messages.length - 1 && (
              <Fab
                classes={{
                  sizeSmall: classes.fabSmallSize,
                  root: classes.fabRoot
                }}
                disableRipple
                size="small"
                className={classes.fab}
                onClick={() => swapMessage(index, index + 1)}
              >
                <ArrowDownward fontSize="small" />
              </Fab>
            )}
          </div>
          {renderMessage(message, newMessage => {
            changeMessage(newMessage, index);
          })}
        </div>
      ))}
      <Button
        variant="outlined"
        size="medium"
        aria-owns={messageTypeEl ? 'message-types' : undefined}
        aria-haspopup="true"
        onClick={openMessageTypes}
      >
        Add bot Response
      </Button>
      <Menu
        id="message-types"
        anchorEl={messageTypeEl}
        open={Boolean(messageTypeEl)}
        onClose={closeMessageTypes}
      >
        {messageTypes.map(messageType => (
          <MenuItem
            key={messageType.value}
            onClick={() => addMessage(messageType.value)}
          >
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
  initialMessageValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  messages: PropTypes.array
};

export default withStyles(style)(MessagesLayoutProvider);
