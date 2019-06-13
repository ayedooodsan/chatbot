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

const generateParams = ({ payload, values }) => {
  if (payload.intent && payload.intent.id === values.intent.id) {
    return payload.params.map(param => {
      const isRequired = values.params.includes(`|${param.name}|`);
      return {
        name: param.name,
        required: isRequired,
        prompt: param.prompt
      };
    });
  }
  return values.intent.params
    ? values.intent.params.map(param => {
        const isRequired = values.params.includes(`|${param.name}|`);
        return {
          name: param.name,
          required: isRequired,
          prompt: null
        };
      })
    : [];
};

const sendAction = (
  { rawMessages, viewedDialog, activeMessageIds },
  { type, payload },
  values
) => {
  let computedRawMessages = _.cloneDeep(rawMessages);
  let computedViewedDialog = _.cloneDeep(viewedDialog);
  let computedActiveMessageIds = _.cloneDeep(activeMessageIds);
  let newParentId = null;
  switch (type) {
    case START_MESSAGE: {
      computedRawMessages.push({
        id: 0,
        parentId: null,
        type: 'USER',
        title: values.title,
        intentId: values.intent.id,
        intent: values.intent,
        params: generateParams({ payload, values }),
        depth: -1
      });
      computedViewedDialog = [];
      computedActiveMessageIds = [];
      newParentId = null;
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
        params: generateParams({ payload, values }),
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
      newParentId = payload.id;
      break;
    }
    case EDIT_ROBOT: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.id
      );
      selectedMessage.payload = values.message;
      newParentId =
        computedActiveMessageIds[computedActiveMessageIds.length - 1].id;
      break;
    }
    case DELETE_ROBOT: {
      const selectedMessageIndex = computedRawMessages.findIndex(
        message => message.id === payload.id
      );
      const { parentId } = computedRawMessages[selectedMessageIndex];
      const selectedParentMessageIndex = computedRawMessages.findIndex(
        message => message.id === parentId
      );
      computedRawMessages.splice(selectedMessageIndex, 1);
      if (selectedParentMessageIndex === -1) {
        computedActiveMessageIds = [];
        computedViewedDialog = [];
        computedRawMessages = [];
        newParentId = null;
      } else {
        computedActiveMessageIds.splice(
          selectedParentMessageIndex,
          computedActiveMessageIds.length
        );
        computedViewedDialog.splice(
          selectedParentMessageIndex,
          computedViewedDialog.length
        );
        newParentId = computedRawMessages[selectedParentMessageIndex].parentId;
      }
      break;
    }
    case REPLY_USER_PARAM: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.prompt = values.message;
      newParentId = computedRawMessages[computedRawMessages.length - 1].id;
      break;
    }
    case EDIT_USER_PARAM: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.prompt = values.message;
      newParentId = computedRawMessages[computedRawMessages.length - 1].id;
      break;
    }
    case DELETE_USER_PARAM: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.prompt = null;
      newParentId = computedRawMessages[computedRawMessages.length - 1].id;
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
      newParentId = payload.id;
      break;
    }
    case EDIT_USER: {
      const selectedMessage = computedRawMessages.find(
        message => message.id === payload.id
      );
      selectedMessage.title = values.title;
      selectedMessage.intentId = values.intent.id;
      selectedMessage.intent = values.intent;
      selectedMessage.params = generateParams({ payload, values });
      newParentId = computedRawMessages[computedRawMessages.length - 1].id;
      break;
    }
    case DELETE_USER: {
      const selectedMessageIndex = computedRawMessages.findIndex(
        message => message.id === payload.id
      );
      const { parentId } = computedRawMessages[selectedMessageIndex];
      const selectedParentMessageIndex = computedRawMessages.findIndex(
        message => message.id === parentId
      );
      computedRawMessages.splice(selectedMessageIndex, 1);
      if (selectedParentMessageIndex === -1) {
        computedActiveMessageIds = [];
        computedViewedDialog = [];
        computedRawMessages = [];
        newParentId = null;
      } else {
        computedActiveMessageIds.splice(
          selectedParentMessageIndex,
          computedActiveMessageIds.length
        );
        computedViewedDialog.splice(
          selectedParentMessageIndex,
          computedViewedDialog.length
        );
        newParentId = computedRawMessages[selectedParentMessageIndex].parentId;
      }
      break;
    }
    default: {
      break;
    }
  }
  return {
    computedRawMessages,
    computedViewedDialog,
    computedActiveMessageIds,
    newParentId
  };
};

export default sendAction;
