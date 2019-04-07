import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import style from './style';
import BubbleChat from '../BubbleChat';
import DialogBar from '../DialogBar';
import RobotDialogInput from '../RobotDialogInput';
import UserMessage from '../UserMessage';

const dialog = [
  {
    id: 1,
    parentId: null,
    type: 'user',
    title: 'Say name',
    intent: {
      id: 1,
      name: 'Say name',
      examples: [
        'Hai my name is Aditio',
        'I am susan sines',
        "It's joko",
        'You can tell me elvis',
        'Call me juan'
      ],
      params: [
        {
          name: 'first',
          required: true,
          messsage: 'Please tell me your first name'
        },
        {
          name: 'last',
          required: false
        }
      ]
    }
  },
  {
    id: 2,
    parentId: 1,
    type: 'bot',
    templateName: 'text',
    payload: 'Hello, I am robot.'
  },
  {
    id: 3,
    parentId: 2,
    type: 'user',
    title: 'Say Hello',
    intentId: 2,
    intent: {
      name: 'Say hai',
      values: ['Good morning', 'Hello', 'Hai'],
      params: []
    }
  },
  {
    id: 4,
    parentId: 2,
    type: 'user',
    title: 'Say Wish',
    intentId: 2,
    intent: {
      name: 'Say hai',
      values: ['I want food', 'I wish could eat banana', 'Need fresh water'],
      params: [
        {
          name: 'good',
          required: true
        }
      ]
    }
  }
];

class DialogMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dialogId: 1,
      dialogTitle: 'Introduction',
      viewedDialog: [],
      activeMessageIds: []
    };
  }

  static getDerivedStateFromProps() {
    const viewedDialog = [];
    const activeMessageIds = [];
    let messages = [];
    let currentActiveMessageId = null;
    const tempDialog = [...dialog];
    while (tempDialog.length > 0) {
      const message = tempDialog.shift();
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
    viewedDialog.push(messages);
    currentActiveMessageId = messages[0].id;
    activeMessageIds.push(currentActiveMessageId);
    return { viewedDialog, activeMessageIds };
  }

  render() {
    const { classes } = this.props;
    const { viewedDialog, activeMessageIds, dialogTitle } = this.state;
    const selectedMessage = 'Say name';
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <DialogBar values={dialogTitle} />
        </Paper>
        <div className={classes.container}>
          <Scrollbar>
            {viewedDialog.map((messages, index) =>
              messages[0].type === 'user' ? (
                <UserMessage
                  messages={messages}
                  activeMessageId={activeMessageIds[index]}
                  activeChildMessageId={activeMessageIds[index + 1]}
                />
              ) : (
                <BubbleChat type="bot">
                  <Typography variant="h6">{messages[0].payload}</Typography>
                </BubbleChat>
              )
            )}
          </Scrollbar>
        </div>
        <Paper className={classes.footer}>
          <RobotDialogInput
            preview={() => (
              <Paper elevation={0} className={classes.preview}>
                <Typography variant="overline" color="primary">
                  User says:{' '}
                </Typography>
                <Typography variant="caption">{selectedMessage}</Typography>
              </Paper>
            )}
          />
        </Paper>
      </Paper>
    );
  }
}

DialogMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(DialogMenu);
