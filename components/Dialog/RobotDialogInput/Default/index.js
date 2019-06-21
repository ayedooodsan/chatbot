import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MessagesLayoutProvider from '../MessagesLayoutProvider';
import style from './style';

const Default = props => {
  const { messages } = props;
  const renderMessage = message => {
    if (message.type === 'text') {
      console.log('text');
    }
  };
  return (
    <MessagesLayoutProvider messages={messages} renderMessage={renderMessage} />
  );
};

Default.defaultProps = {
  messages: []
};

Default.propTypes = {
  messages: PropTypes.array
};

export default withStyles(style)(Default);
