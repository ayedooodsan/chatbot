import React from 'react';
import PropTypes from 'prop-types';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import TelegramQuickReplyResponse from './QuickReplyInput';
import TelegramCardResponse from './CardInput';
import TelegramCardImageInput from './ImageInput';
import TelegramButtonResponse from './ButtonInput';

const Telegram = props => {
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
        <TelegramQuickReplyResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'image') {
      return (
        <TelegramCardImageInput
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'button') {
      return (
        <TelegramButtonResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'card') {
      return (
        <TelegramCardResponse
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
        platform: 'telegram',
        type: messageType,
        value: []
      };
    }
    if (messageType === 'quickReply') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'telegram',
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
        platform: 'telegram',
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
        platform: 'telegram',
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

Telegram.defaultProps = {
  messages: []
};

Telegram.propTypes = {
  onChange: PropTypes.func.isRequired,
  messages: PropTypes.array
};

export default Telegram;
