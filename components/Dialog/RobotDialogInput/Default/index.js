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
    return (
      <CodeEditor
        label="Code Response"
        value={message.value}
        onChange={value => changeMessage({ ...message, value })}
      />
    );
  };

  const initialMessageValue = messageType => {
    if (messageType === 'text') {
      return {
        platform: 'default',
        type: messageType,
        key: new Date().getTime() + Math.random(),
        value: []
      };
    }
    return {
      platform: 'default',
      type: 'code',
      key: new Date().getTime() + Math.random(),
      value: '{\n    "attribute": "value"\n}'
    };
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

Default.defaultProps = {
  messages: []
};

Default.propTypes = {
  onChange: PropTypes.func.isRequired,
  messages: PropTypes.array
};

export default withStyles(style)(Default);
