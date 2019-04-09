import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import UserSayMessage from '../UserSayMessage';
import IntentBar from '../IntentBar';
import IntentInput from '../IntentInput';
import style from './style';

class IntentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            message: 'Please tell me your first name'
          },
          {
            name: 'last',
            required: false
          }
        ]
      },
      intentInputProps: {}
    };
  }

  onChangeIntentInputProps = intentInputProps => {
    this.setState({ intentInputProps });
  };

  render() {
    const { intent, intentInputProps } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <IntentBar values={intent.name} />
        </Paper>
        <div className={classes.container}>
          <Scrollbar>
            {intent.examples.map((example, index) => (
              <UserSayMessage
                message={example}
                index={index}
                onChangeIntentInput={this.onChangeIntentInputProps}
              />
            ))}
          </Scrollbar>
        </div>
        <Paper className={classes.footer}>
          <IntentInput {...intentInputProps} />
        </Paper>
      </Paper>
    );
  }
}

IntentMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(IntentMenu);
