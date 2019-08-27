import React from 'react';
import PropTypes from 'prop-types';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import FacebookQuickReplyResponse from './QuickReplyInput';
import FacebookButtonResponse from './ButtonInput';
import FacebookCardResponse from './CardInput';

const Facebook = props => {
  const messageTypes = [
    { value: 'text', label: 'Text Response' },
    { value: 'quickReply', label: 'Quick Reply' },
    { value: 'button', label: 'Button' },
    { value: 'card', label: 'Card' }
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
    if (message.type === 'card') {
      return (
        <FacebookCardResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
  };

  const initialMessageValue = messageType => {
    if (messageType === 'text') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'facebook',
        type: messageType,
        value: []
      };
    }
    if (messageType === 'quickReply') {
      return {
        key: new Date().getTime() + Math.random(),
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
        key: new Date().getTime() + Math.random(),
        platform: 'facebook',
        type: messageType,
        value: {
          text: '',
          buttons: [
            {
              key: new Date().getTime() + Math.random(),
              title: '',
              value: ''
            }
          ]
        }
      };
    }
    if (messageType === 'card') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'facebook',
        type: messageType,
        value: {
          title: '',
          buttons: [
            {
              key: new Date().getTime() + Math.random(),
              text: ''
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
