import _ from 'lodash';
import {
  REPLY_USER,
  REPLY_USER_PARAM,
  EDIT_USER,
  DELETE_USER,
  START_MESSAGE,
  EDIT_USER_PARAM,
  DELETE_USER_PARAM,
  REPLY_ROBOT,
  EDIT_ROBOT,
  DELETE_ROBOT
} from '../DialogInput/constant';
import { findLastIndex } from '../../../libraries/helpers';

const sendAction = (
  { rawMessages, viewedDialog, activeMessageIds },
  { type, payload },
  values
) => {
  const computedRawMessages = _.cloneDeep(rawMessages);
  let computedViewedDialog = _.cloneDeep(viewedDialog);
  let computedActiveMessageIds = _.cloneDeep(activeMessageIds);
  switch (type) {
    case START_MESSAGE: {
      computedRawMessages.push({
        id: 0,
        parentId: null,
        type: 'USER',
        title: values.title,
        intentId: values.intent.id,
        intent: values.intent,
        depth: -1
      });
      computedViewedDialog = [];
      computedActiveMessageIds = [];
      break;
    }
    case REPLY_ROBOT: {
      const index = findLastIndex(
        computedRawMessages,
        message => message.depth === payload.depth
      );
      computedRawMessages.splice(index + 1, 0, {
        id: computedRawMessages.length,
        parentId: payload.id,
        type: 'USER',
        title: values.title,
        intentId: values.intent.id,
        intent: values.intent,
        depth: payload.depth + 1
      });
      const activeMessageIdIndex = computedActiveMessageIds.findIndex(
        computedActiveMessageId => computedActiveMessageId === payload.id
      );
      computedActiveMessageIds.splice(
        activeMessageIdIndex + 1,
        computedActiveMessageIds.length - activeMessageIdIndex - 1
      );
      computedViewedDialog.splice(
        activeMessageIdIndex + 1,
        computedViewedDialog.length - activeMessageIdIndex - 1
      );
      break;
    }
    case EDIT_ROBOT: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.id
      );
      selectedMessage.templateName = values.templateName;
      selectedMessage.payload = values.payload;
      break;
    }
    case DELETE_ROBOT: {
      const selectedMessageIndex = computedRawMessages.findIndex(
        message => message.id === payload.id
      );
      computedRawMessages.splice(selectedMessageIndex, 1);
      break;
    }
    case REPLY_USER_PARAM: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.intent.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.message = values.message;
      break;
    }
    case EDIT_USER_PARAM: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.intent.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.message = values.message;
      break;
    }
    case DELETE_USER_PARAM: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.intent.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.message = null;
      break;
    }
    case REPLY_USER: {
      const index = findLastIndex(
        computedRawMessages,
        message => message.depth === payload.depth
      );
      computedRawMessages.splice(index + 1, 0, {
        id: computedRawMessages.length,
        parentId: payload.id,
        type: 'BOT',
        templateName: 'text',
        payload: values.message,
        depth: payload.depth + 1
      });
      const activeMessageIdIndex = computedActiveMessageIds.findIndex(
        computedActiveMessageId => computedActiveMessageId === payload.id
      );
      computedActiveMessageIds.splice(
        activeMessageIdIndex + 1,
        computedActiveMessageIds.length - activeMessageIdIndex - 1
      );
      computedViewedDialog.splice(
        activeMessageIdIndex + 1,
        computedViewedDialog.length - activeMessageIdIndex - 1
      );
      break;
    }
    case EDIT_USER: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.id
      );
      selectedMessage.title = values.title;
      selectedMessage.intentId = values.intentId;
      selectedMessage.intent = values.intent;
      break;
    }
    case DELETE_USER: {
      const selectedMessageIndex = computedRawMessages.findIndex(
        message => message.id === payload.id
      );
      computedRawMessages.splice(selectedMessageIndex, 1);
      break;
    }
    default: {
      break;
    }
  }
  return {
    computedRawMessages,
    computedViewedDialog,
    computedActiveMessageIds
  };
};

export default sendAction;
