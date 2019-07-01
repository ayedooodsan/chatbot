import React from 'react';
import PropTypes from 'prop-types';
import DefaultCodeView from '../Default/CodeView';
import DefaultTextView from '../Default/TextView';
import ZohoTextView from '../Zoho/TextView';
import ZohoSelectView from '../Zoho/SelectView';

const MessageView = props => {
  const { value, type, platform } = props;
  let View = null;
  if (platform === 'default' && type === 'text') {
    View = DefaultTextView;
  } else if (platform === 'default' && type === 'code') {
    View = DefaultCodeView;
  } else if (platform === 'zoho' && type === 'text') {
    View = ZohoTextView;
  } else if (platform === 'zoho' && type === 'select') {
    View = ZohoSelectView;
  }
  return View && <View value={value} />;
};

MessageView.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object
  ]),
  platform: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default MessageView;
