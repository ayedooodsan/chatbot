import React from 'react';
import PropTypes from 'prop-types';
import DefaultCodeView from '../Default/CodeView';
import DefaultTextView from '../Default/TextView';
import ZohoTextView from '../Zoho/TextView';
import ZohoSelectView from '../Zoho/SelectView';
import ZohoSuggestionView from '../Zoho/SuggestionView';
import ZohoLinksView from '../Zoho/LinksView';
import ZohoImageView from '../Zoho/ImageView';
import ZohoHandoverView from '../Zoho/HandoverView';
import FacebookTextView from '../Facebook/TextView';
import FacebookButtonView from '../Facebook/ButtonView';
import FacebookQuickReplyView from '../Facebook/QuickReplyView';
import FacebookCardView from '../Facebook/CardView';
import TelegramTextView from '../Telegram/TextView';
import TelegramButtonView from '../Telegram/ButtonView';
import TelegramQuickReplyView from '../Telegram/QuickReplyView';
import TelegramCardView from '../Telegram/CardView';

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
  } else if (platform === 'zoho' && type === 'suggestion') {
    View = ZohoSuggestionView;
  } else if (platform === 'zoho' && type === 'links') {
    View = ZohoLinksView;
  } else if (platform === 'zoho' && type === 'image') {
    View = ZohoImageView;
  } else if (platform === 'zoho' && type === 'forward') {
    View = ZohoHandoverView;
  } else if (platform === 'facebook' && type === 'text') {
    View = FacebookTextView;
  } else if (platform === 'facebook' && type === 'button') {
    View = FacebookButtonView;
  } else if (platform === 'facebook' && type === 'quickReply') {
    View = FacebookQuickReplyView;
  } else if (platform === 'facebook' && type === 'card') {
    View = FacebookCardView;
  } else if (platform === 'telegram' && type === 'text') {
    View = TelegramTextView;
  } else if (platform === 'telegram' && type === 'button') {
    View = TelegramButtonView;
  } else if (platform === 'telegram' && type === 'quickReply') {
    View = TelegramQuickReplyView;
  } else if (platform === 'telegram' && type === 'card') {
    View = TelegramCardView;
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
