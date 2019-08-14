import React from 'react';
import PropTypes from 'prop-types';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import FacebookQuickReplyResponse from './QuickReplyInput';
import FacebookButtonResponse from './ButtonInput';

const Facebook = props => {
  const messageTypes = [
    { value: 'text', label: 'Text Response' },
    { value: 'quickReply', label: 'Quick Replies' },
    { value: 'button', label: 'Buttons' }
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
    if (message.type === 'quickReply') {
      return (
        <FacebookQuickReplyResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'button') {
      return (
        <FacebookButtonResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
  };

  const initialMessageValue = messageType => {
    if (messageType === 'text') {
      return {
        key: Date.now() + Math.random(),
        platform: 'facebook',
        type: messageType,
        value: []
      };
    }
    if (messageType === 'quickReply') {
      return {
        key: Date.now() + Math.random(),
        platform: 'facebook',
        type: messageType,
        value: {
          title: '',
          replies: ['']
        }
      };
    }
    if (messageType === 'button') {
      return {
        key: Date.now() + Math.random(),
        platform: 'facebook',
        type: messageType,
        value: {
          text: '',
          buttons: [
            {
              key: Date.now() + Math.random(),
              title: '',
              value: ''
            }
          ]
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

Facebook.defaultProps = {
  messages: []
};

Facebook.propTypes = {
  onChange: PropTypes.func.isRequired,
  messages: PropTypes.array
};

export default Facebook;
