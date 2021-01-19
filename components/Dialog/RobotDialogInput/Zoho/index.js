import React from 'react';
import PropTypes from 'prop-types';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import ZohoSelectResponse from './SelectInput';
import ZohoSuggestionResponse from './SuggestionInput';
import ZohoLinksResponse from './LinksInput';
import ZohoImageResponse from './ImageInput';
import ZohoHandoverResponse from './HandoverInput';

const Zoho = props => {
  const messageTypes = [
    { value: 'text', label: 'Text Response' },
    { value: 'select', label: 'Select Response' },
    { value: 'suggestion', label: 'Suggestion Response' },
    { value: 'links', label: 'Link Response' },
    { value: 'forward', label: 'Handover Response' },
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
    if (message.type === 'suggestion') {
      return (
        <ZohoSuggestionResponse
          value={message.value}
          onChange={value => changeMessage({ ...message, value })}
        />
      );
    }
    if (message.type === 'forward') {
      return (
        <ZohoHandoverResponse
          label="Handover Response"
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
        platform: 'zoho',
        type: messageType,
        value: []
      };
    }
    if (messageType === 'forward') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: ''
      };
    }
    if (messageType === 'select') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: {
          options: ['']
        }
      };
    }
    if (messageType === 'suggestion') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: {
          suggestions: ['']
        }
      };
    }
    if (messageType === 'links') {
      return {
        key: new Date().getTime() + Math.random(),
        platform: 'zoho',
        type: messageType,
        value: {
          text: '',
          image: '',
          links: [
            {
              key: new Date().getTime() + Math.random(),
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
        key: new Date().getTime() + Math.random(),
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
