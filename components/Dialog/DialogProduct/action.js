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

const sendAction = (currentState, { type, payload }, values) => {
  switch (type) {
    case START_MESSAGE: {
      currentState.push({
        id: 0,
        parentId: null,
        type: 'USER',
        title: values.title,
        intentId: values.intentId,
        intent: values.intent,
        depth: -1
      });
      break;
    }
    case REPLY_ROBOT: {
      currentState.push({
        id: currentState.length,
        parentId: payload.id,
        type: 'USER',
        title: values.title,
        intentId: values.intentId,
        intent: values.intent,
        depth: payload.depth + 1
      });
      break;
    }
    case EDIT_ROBOT: {
      const selectedMessage = currentState.find(
        message => message.id === payload.id
      );
      selectedMessage.templateName = values.templateName;
      selectedMessage.payload = values.payload;
      break;
    }
    case DELETE_ROBOT: {
      const selectedMessageIndex = currentState.findIndex(
        message => message.id === payload.id
      );
      currentState.splice(selectedMessageIndex, 1);
      break;
    }
    case REPLY_USER_PARAM: {
      const selectedMessage = currentState.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.intent.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.message = values.message;
      break;
    }
    case EDIT_USER_PARAM: {
      const selectedMessage = currentState.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.intent.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.message = values.message;
      break;
    }
    case DELETE_USER_PARAM: {
      const selectedMessage = currentState.find(
        message => message.id === payload.message.id
      );
      const selectedParam = selectedMessage.intent.params.find(
        param => param.name === payload.param.name
      );
      selectedParam.message = null;
      break;
    }
    case REPLY_USER: {
      currentState.push({
        id: currentState.length,
        parentId: payload.id,
        type: 'BOT',
        templateName: 'text',
        payload: values.message,
        depth: payload.depth + 1
      });
      break;
    }
    case EDIT_USER: {
      const selectedMessage = currentState.find(
        message => message.id === payload.id
      );
      selectedMessage.title = values.title;
      selectedMessage.intentId = values.intentId;
      selectedMessage.intent = values.intent;
      break;
    }
    case DELETE_USER: {
      const selectedMessageIndex = currentState.findIndex(
        message => message.id === payload.id
      );
      currentState.splice(selectedMessageIndex, 1);
      break;
    }
    default: {
      break;
    }
  }
  return currentState;
};

export default sendAction;
