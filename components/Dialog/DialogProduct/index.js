/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import ProductHead from '../../layout/ProductHead';
import style from './style';
import DialogInput from '../DialogInput';
import RobotMessage from '../RobotMessage';
import UserMessage from '../UserMessage';
import connect from './store';
import sendAction from './action';
import { START_MESSAGE } from '../DialogInput/constant';

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
      const newRawMessages = sendAction(rawMessages, dialogInputProps, values);
      return { rawMessages: newRawMessages };
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
          {rawMessages.length === 0 && _.isEqual(dialogInputProps, {}) && (
            <div className={classes.startContainer}>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  this.onChangeDialogInputProps({ type: START_MESSAGE })
                }
              >
                Start Dialog
              </Button>
            </div>
          )}
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
          <DialogInput
            {...dialogInputProps}
            reset={() => this.onChangeDialogInputProps({})}
          />
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
