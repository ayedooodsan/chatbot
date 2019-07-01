import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import ZohoSelectResponse from './SelectInput';
import style from './style';

const Zoho = props => {
  const messageTypes = [
    { value: 'text', label: 'Text Response' },
    { value: 'select', label: 'Select Response' }
    // { value: 'links', label: 'Link Response' },
    // { value: 'image', label: 'Image Response' }
  ];
  const { messages, onChange } = props;
  const renderMessage = (message, changeMessage) => {
    if (message.type === 'text') {
      return (
        <TextEditor
          label="Text Response"
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'select') {
      return (
        <ZohoSelectResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
  };

  const initialMessageValue = messageType => {
    if (messageType === 'text') {
      return {
        platform: 'zoho',
        type: messageType,
        key: Date.now() + Math.random(),
        value: []
      };
    }
    if (messageType === 'select') {
      return {
        platform: 'zoho',
        type: messageType,
        key: Date.now() + Math.random(),
        value: {
          options: ['']
        }
      };
    }
  };

  return (
    <MessagesLayoutProvider
      messageTypes={messageTypes}
      initialMessageValue={initialMessageValue}
      messages={messages.map(message => ({
        ...message
      }))}
      onChange={onChange}
      renderMessage={renderMessage}
    />
  );
};

Zoho.defaultProps = {
  messages: []
};

Zoho.propTypes = {
  onChange: PropTypes.func.isRequired,
  messages: PropTypes.array
};

export default withStyles(style)(Zoho);
