/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import ProductHead from '../../layout/ProductHead';
import style from './style';
import DialogInput from '../DialogInput';
import RobotMessage from '../RobotMessage';
import UserMessage from '../UserMessage';
import connect from './store';
import sendAction from './action';
import { START_MESSAGE } from '../DialogInput/constant';
import redirect from '../../../libraries/redirect';

class DialogProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      rawMessages: [],
      activeMessageIds: [],
      isViewUnsatifiedParam: false,
      viewedDialog: [],
      viewedUnsatifiedDialog: [],
      dialogInputProps: {}
    };
    this.afterSave = false;
  }

  componentDidMount() {
    const { messages, title } = this.props.dialog;
    const parsedMessages = messages.map(message => ({
      ...message,
      payload: message.payload
        ? message.payload.map(payloadEl => ({
            key: new Date().getTime() + Math.random(),
            type: payloadEl.type,
            platform: payloadEl.platform,
            value: JSON.parse(payloadEl.value)
          }))
        : null
    }));
    this.setState({
      rawMessages: parsedMessages,
      title
    });
    this.setState(this.updateViewedDialog(parsedMessages, null, [], []));
  }

  shouldComponentUpdate() {
    if (this.afterSave) {
      this.afterSave = false;
      return false;
    }
    return true;
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
      const parsedMessages = messages.map(message => ({
        ...message,
        payload: message.payload
          ? message.payload.map(payloadEl => ({
              key: new Date().getTime() + Math.random(),
              type: payloadEl.type,
              platform: payloadEl.platform,
              value: JSON.parse(payloadEl.value)
            }))
          : null
      }));
      this.setState({
        rawMessages: parsedMessages,
        title
      });
      this.setState(this.updateViewedDialog(parsedMessages, null, [], []));
    }
  }

  onChangeDialogInputProps = dialogInputProps => {
    this.setState({ dialogInputProps: _.cloneDeep(dialogInputProps) });
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
    const activeMessageIds = [...currentActiveMessageIds];
    if (
      parentId === null ||
      rawMessages.find(rawMessage => rawMessage.parentId === parentId)
    ) {
      const viewedDialog = [...currentViewedDialog];
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
    }
    let messages = [];
    const viewDepth = activeMessageIds.length - 1;
    const viewedDialog = rawMessages.reduce(
      (currentVewedDialog, rawMessage) => {
        const newViewedDialog = currentVewedDialog;
        const currentDepth = rawMessage.depth + 1;
        if (currentDepth > viewDepth) {
          return newViewedDialog;
        }
        const isNewDepth = currentVewedDialog.length !== currentDepth;
        if (isNewDepth) {
          newViewedDialog.push(messages);
          messages = [rawMessage];
        } else {
          messages.push(rawMessage);
        }
        return newViewedDialog;
      },
      []
    );
    if (messages.length !== 0) {
      viewedDialog.push(messages);
    }
    return { viewedDialog, activeMessageIds };
  };

  changeActiveMessageIds = (index, value) => {
    this.setState(prevState => {
      if (value === 'satisfied') {
        const newViewedDialog = prevState.viewedDialog.slice(0, index);
        return {
          isViewUnsatifiedParam: true,
          viewedUnsatifiedDialog: newViewedDialog
        };
        // eslint-disable-next-line no-else-return
      } else if (index < prevState.viewedDialog.length) {
        const newActiveMessageIds = prevState.activeMessageIds.slice(
          0,
          index + 1
        );
        const newViewedDialog = prevState.viewedDialog.slice(0, index + 1);
        newActiveMessageIds[index] = value;
        return {
          isViewUnsatifiedParam: false,
          ...this.updateViewedDialog(
            prevState.rawMessages,
            value,
            newViewedDialog,
            newActiveMessageIds
          )
        };
      } else {
        return {
          isViewUnsatifiedParam: false
        };
      }
    });
  };

  reset = () => this.onChangeDialogInputProps({});

  send = values => {
    this.setState(prevState => {
      const {
        dialogInputProps,
        rawMessages,
        viewedDialog,
        activeMessageIds
      } = prevState;
      const {
        computedViewedDialog,
        computedActiveMessageIds,
        computedRawMessages,
        newParentId
      } = sendAction(
        { rawMessages, viewedDialog, activeMessageIds },
        dialogInputProps,
        values
      );
      const result = this.updateViewedDialog(
        computedRawMessages,
        newParentId,
        computedViewedDialog,
        computedActiveMessageIds
      );
      const newViewedDialog = result.viewedDialog;
      const newActiveMessageIds = result.activeMessageIds;
      return {
        viewedDialog: newViewedDialog,
        viewedUnsatifiedDialog: newViewedDialog.slice(
          0,
          prevState.viewedUnsatifiedDialog.length
        ),
        activeMessageIds: newActiveMessageIds,
        rawMessages: computedRawMessages
      };
    }, this.reset);
  };

  onSave = () => {
    const { title, rawMessages } = this.state;
    const { updateDialog, dialogId } = this.props;
    const messages = rawMessages.map(rawMessage => ({
      id: String(rawMessage.id),
      parentId:
        rawMessage.parentId === null ? null : String(rawMessage.parentId),
      intentId: rawMessage.intent ? rawMessage.intent.id : null,
      params: rawMessage.intent
        ? rawMessage.params.map(param => ({
            name: param.name,
            required: param.required,
            prompts: param.prompts
          }))
        : null,
      actionName: rawMessage.actionName ? rawMessage.actionName : null,
      webhookUsed: rawMessage.webhookUsed,
      title: rawMessage.title,
      type: rawMessage.type,
      depth: rawMessage.depth,
      payload: rawMessage.payload
        ? rawMessage.payload.map(payloadEl => ({
            type: payloadEl.type,
            platform: payloadEl.platform,
            value: JSON.stringify(payloadEl.value)
          }))
        : null
    }));
    this.afterSave = true;
    updateDialog({
      id: dialogId,
      title,
      messages
    });
  };

  onDelete = async () => {
    const { deleteDialog, dialogId, projectId } = this.props;
    const response = await deleteDialog({ id: dialogId });
    redirect({}, `/${projectId}/dialog`);
    return response;
  };

  isSelected = messageId => {
    const { dialogInputProps } = this.state;
    if (
      dialogInputProps.payload &&
      (dialogInputProps.payload.id === messageId ||
        (dialogInputProps.payload.message &&
          dialogInputProps.payload.message.id === messageId))
    ) {
      return true;
    }
    return false;
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
            deleteSubMessage={`To delete this dialog, please enter "DELETE".`}
            onChange={this.onChangeTitle}
            onSave={this.onSave}
            onDelete={this.onDelete}
            projectId={projectId}
            autoFocus
          />
        </div>
        <Grid container className={classes.body}>
          <Grid item xs={5} className={classes.messages}>
            {rawMessages.length === 0 && _.isEqual(dialogInputProps, {}) && (
              <div className={classes.startContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    this.onChangeDialogInputProps({
                      type: START_MESSAGE,
                      payload: { id: null }
                    })
                  }
                >
                  Start Dialog
                </Button>
              </div>
            )}
            {rawMessages.length > 0 && (
              <Scrollbar
                contentProps={{ style: { width: '100%', paddingRight: 5 } }}
              >
                {isViewUnsatifiedParam
                  ? viewedUnsatifiedDialog.map((messages, index) =>
                      messages[0].type === 'USER' ? (
                        <UserMessage
                          dialogInputType={dialogInputProps.type}
                          selected={this.isSelected(activeMessageIds[index])}
                          key={messages[0].id}
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
                          key={messages[0].id}
                          selected={this.isSelected(messages[0].id)}
                          messages={messages}
                          onChangeDialogInput={this.onChangeDialogInputProps}
                        />
                      )
                    )
                  : viewedDialog.map((messages, index) =>
                      messages[0].type === 'USER' ? (
                        <UserMessage
                          key={messages[0].id}
                          selected={this.isSelected(activeMessageIds[index])}
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
                          key={messages[0].id}
                          selected={this.isSelected(messages[0].id)}
                          messages={messages}
                          onChangeDialogInput={this.onChangeDialogInputProps}
                        />
                      )
                    )}
              </Scrollbar>
            )}
          </Grid>
          <Grid item xs={7}>
            <Paper className={classes.inputContainer}>
              <DialogInput
                key={`${dialogInputProps.type}-${
                  dialogInputProps.payload
                    ? dialogInputProps.payload.id || ''
                    : ''
                }`}
                {...dialogInputProps}
                reset={this.reset}
                send={this.send}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DialogProduct.defaultProps = {
  dialog: { messages: [] },
  dialogId: null
};

DialogProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  deleteDialog: PropTypes.func.isRequired,
  updateDialog: PropTypes.func.isRequired,
  dialogId: PropTypes.string,
  dialog: PropTypes.object
};

export default withStyles(style)(connect(DialogProduct));
