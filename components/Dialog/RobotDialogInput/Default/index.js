import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import TextEditor from '../../../common/TextEditor';
import CodeEditor from '../../../common/CodeEditor';
import style from './style';

const Default = props => {
  const messageTypes = [
    { value: 'text', label: 'Text Response' },
    { value: 'code', label: 'Code Response' }
  ];
  const { messages } = props;
  const renderMessage = (message, changeMessage) => {
    if (message.type === 'text') {
      return (
        <TextEditor
          value={message.value}
          onChange={value => changeMessage({ type: message.type, value })}
        />
      );
    }
    return (
      <CodeEditor
        value={message.value}
        onChange={value => changeMessage({ type: message.type, value })}
      />
    );
  };

  const initialMessageValue = messageType => {
    if (messageType === 'text') {
      return {
        type: messageType,
        key: Date.now(),
        value: ['first text response variant', 'second text response variant']
      };
    }
    return {
      type: 'code',
      key: Date.now(),
      value: '{\n    "attribute": value\n}'
    };
  };

  return (
    <MessagesLayoutProvider
      messageTypes={messageTypes}
      initialMessageValue={initialMessageValue}
      messages={messages.map(message => ({ ...message, key: Date.now() }))}
      renderMessage={renderMessage}
    />
  );
};

Default.defaultProps = {
  messages: []
};

Default.propTypes = {
  messages: PropTypes.array
};

export default withStyles(style)(Default);
