import React from 'react';
import PropTypes from 'prop-types';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import ZohoSelectResponse from './SelectInput';
import ZohoLinksResponse from './LinksInput';
import ZohoImageResponse from './ImageInput';

const Zoho = props => {
  const messageTypes = [
    { value: 'text', label: 'Text Response' },
    { value: 'select', label: 'Select Response' },
    { value: 'links', label: 'Link Response' },
    { value: 'image', label: 'Image Response' }
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
    if (message.type === 'links') {
      return (
        <ZohoLinksResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'image') {
      return (
        <ZohoImageResponse
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
        platform: 'zoho',
        type: messageType,
        value: []
      };
    }
    if (messageType === 'select') {
      return {
        key: Date.now() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: {
          options: ['']
        }
      };
    }
    if (messageType === 'links') {
      return {
        key: Date.now() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: {
          text: '',
          image: '',
          links: [
            {
              key: Date.now() + Math.random(),
              url: '',
              text: '',
              icon: ''
            }
          ]
        }
      };
    }
    if (messageType === 'image') {
      return {
        key: Date.now() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: {
          text: '',
          image: ''
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

export default Zoho;
