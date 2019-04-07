import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import style from './style';
import BubbleChat from '../BubbleChat';
import DialogBar from '../DialogBar';
import DialogInput from '../DialogInput';

class DialogMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dialogId: 1,
      dialogTitle: 'Introduction',
      dialog: [
        {
          order: 1,
          type: 'user',
          options: [
            {
              id: 1,
              title: 'Say name',
              intentId: 1,
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
                    required: true
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
              title: 'Say Hello',
              intentId: 2,
              intent: {
                name: 'Say hai',
                values: ['Good morning', 'Hello', 'Hai'],
                params: []
              }
            }
          ]
        },
        {
          order: 2,
          type: 'bot',
          templateName: 'text',
          payload: 'Hello, I am robot.'
        }
      ]
    };
  }

  render() {
    const { classes } = this.props;
    const { dialog, dialogTitle } = this.state;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <DialogBar values={dialogTitle} />
        </Paper>
        <div className={classes.container}>
          {dialog.map(message =>
            message.type === 'bot' ? (
              <BubbleChat type="self">
                <Typography variant="h6">{message.payload}</Typography>
              </BubbleChat>
            ) : (
              <BubbleChat type="other">
                <Typography variant="h6">{message.options[0].name}</Typography>
              </BubbleChat>
            )
          )}
        </div>
        <Paper className={classes.footer}>
          <DialogInput />
        </Paper>
      </Paper>
    );
  }
}

DialogMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(DialogMenu);
