/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import ProductHead from '../../layout/ProductHead';
import style from './style';
import DialogInput from '../DialogInput';
import RobotMessage from '../RobotMessage';
import UserMessage from '../UserMessage';
import {
  REPLY_USER,
  REPLY_USER_PARAM,
  EDIT_USER,
  DELETE_USER
} from '../DialogInput/constant';
import connect from './store';

class DialogProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dialogId: 1,
      title: '',
      // rootMessageId: '',
      rawMessages: [],
      activeMessageIds: [],
      isViewUnsatifiedParam: false,
      viewedDialog: [],
      viewedUnsatifiedDialog: [],
      dialogInputProps: {}
    };
  }

  componentDidMount() {
    const { messages, title } = this.props.dialog;
    this.setState({ rawMessages: messages, title });
    this.setState(this.updateViewedDialog(messages, null, [], []));
  }

  componentDidUpdate(prevProps) {
    const isMessagesEqual = _.isEqual(
      prevProps.dialog.messages,
      this.props.dialog.messages
    );
    const isTitleEqual = _.isEqual(
      prevProps.dialog.title,
      this.props.dialog.title
    );
    if (!isMessagesEqual || !isTitleEqual) {
      const { messages, title } = this.props.dialog;
      this.setState({ rawMessages: messages, title });
      this.setState(this.updateViewedDialog(messages, null, [], []));
    }
  }

  onChangeDialogInputProps = dialogInputProps => {
    this.setState({ dialogInputProps });
  };

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  updateViewedDialog = (
    rawMessages,
    parentId,
    currentViewedDialog,
    currentActiveMessageIds
  ) => {
    const viewedDialog = [...currentViewedDialog];
    const activeMessageIds = [...currentActiveMessageIds];
    let messages = [];
    let currentActiveMessageId = parentId;
    const tempRawMessages = [...rawMessages];
    while (tempRawMessages.length > 0) {
      const message = tempRawMessages.shift();
      if (message.parentId === currentActiveMessageId) {
        messages.push(message);
      } else {
        const activeMessage = messages.find(
          // eslint-disable-next-line no-loop-func
          parent => parent.id === message.parentId
        );
        if (activeMessage !== undefined) {
          viewedDialog.push(messages);
          messages = [message];
          currentActiveMessageId = activeMessage.id;
          activeMessageIds.push(currentActiveMessageId);
        }
      }
    }
    if (messages.length !== 0) {
      viewedDialog.push(messages);
      currentActiveMessageId = messages[0].id;
      activeMessageIds.push(currentActiveMessageId);
    }
    return { viewedDialog, activeMessageIds };
  };

  changeActiveMessageIds = (index, value) => {
    this.setState(prevState => {
      if (value === null) {
        const newViewedDialog = prevState.viewedDialog.slice(0, index);
        return {
          isViewUnsatifiedParam: true,
          viewedUnsatifiedDialog: newViewedDialog
        };
        // eslint-disable-next-line no-else-return
      } else {
        const newActiveMessageIds = prevState.activeMessageIds.slice(
          0,
          index + 1
        );
        newActiveMessageIds[index] = value;
        return {
          isViewUnsatifiedParam: false,
          ...this.updateViewedDialog(
            prevState.rawMessages,
            value,
            prevState.viewedDialog.slice(0, index + 1),
            newActiveMessageIds
          )
        };
      }
    });
  };

  send = values => {
    this.setState(prevState => {
      const { dialogInputProps, rawMessages } = prevState;
      switch (dialogInputProps.type) {
        case REPLY_USER: {
          rawMessages.push({
            id: rawMessages.length,
            parentId: values.id,
            type: 'bot',
            templateName: 'text',
            payload: values.message,
            depth: values.depth + 1
          });
          break;
        }
        case REPLY_USER_PARAM: {
          const selectedMessage = rawMessages.find(
            message => message.id === values.id
          );
          const selectedParam = selectedMessage.intent.params.find(
            param => param.name === values.paramName
          );
          selectedParam.message = values.message;
          break;
        }
        case EDIT_USER: {
          const selectedMessage = rawMessages.find(
            message => message.id === values.id
          );
          selectedMessage.title = values.title;
          selectedMessage.intentId = values.intentId;
          selectedMessage.intent = values.intent;
          break;
        }
        case DELETE_USER: {
          const selectedMessageIndex = rawMessages.findIndex(
            message => message.id === values.id
          );
          rawMessages.splice(selectedMessageIndex, 1);
          break;
        }
        default: {
          break;
        }
      }
      return { rawMessages };
    });
  };

  render() {
    const { classes, projectId } = this.props;
    const {
      title,
      rawMessages,
      viewedDialog,
      activeMessageIds,
      isViewUnsatifiedParam,
      viewedUnsatifiedDialog,
      dialogInputProps
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <ProductHead
            productName={title}
            deleteMessage={`Delete ${title} Dialog`}
            deleteSubMessage="To delete this dialog, please enter the first word on dialog title."
            onChange={this.onChangeTitle}
            onSave={this.onSave}
            onDelete={this.onDelete}
            projectId={projectId}
            autoFocus
          />
        </div>
        <div className={classes.body}>
          {rawMessages.length === 0 && null}
          {rawMessages.length > 0 && (
            <Scrollbar>
              {isViewUnsatifiedParam
                ? viewedUnsatifiedDialog.map((messages, index) =>
                    messages[0].type === 'user' ? (
                      <UserMessage
                        messages={messages}
                        onChangeDialogInput={this.onChangeDialogInputProps}
                        onChangeActiveMessage={activeMessageId => {
                          this.changeActiveMessageIds(index, activeMessageId);
                        }}
                        onChangeChildActiveMessage={activeMessageId => {
                          this.changeActiveMessageIds(
                            index + 1,
                            activeMessageId
                          );
                        }}
                        activeMessageId={activeMessageIds[index]}
                        activeChildMessageId={activeMessageIds[index + 1]}
                      />
                    ) : (
                      <RobotMessage
                        messages={messages}
                        onChangeDialogInput={this.onChangeDialogInputProps}
                        activeChildMessageId={activeMessageIds[index + 1]}
                      />
                    )
                  )
                : viewedDialog.map((messages, index) =>
                    messages[0].type === 'user' ? (
                      <UserMessage
                        messages={messages}
                        onChangeDialogInput={this.onChangeDialogInputProps}
                        onChangeActiveMessage={activeMessageId => {
                          this.changeActiveMessageIds(index, activeMessageId);
                        }}
                        onChangeChildActiveMessage={activeMessageId => {
                          this.changeActiveMessageIds(
                            index + 1,
                            activeMessageId
                          );
                        }}
                        activeMessageId={activeMessageIds[index]}
                        activeChildMessageId={activeMessageIds[index + 1]}
                      />
                    ) : (
                      <RobotMessage
                        messages={messages}
                        onChangeDialogInput={this.onChangeDialogInputProps}
                        activeChildMessageId={activeMessageIds[index + 1]}
                      />
                    )
                  )}
            </Scrollbar>
          )}
        </div>
        <Paper className={classes.footer}>
          <DialogInput {...dialogInputProps} />
        </Paper>
      </div>
    );
  }
}

DialogProduct.defaultProps = {
  dialog: { messages: [] }
};

DialogProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.object.isRequired,
  dialog: PropTypes.object
};

export default withStyles(style)(connect(DialogProduct));
