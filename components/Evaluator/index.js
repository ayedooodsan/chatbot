import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { withRouter } from 'next/router';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import style from './style';
import connect from './store';

class Evaluator extends React.Component {
  state = {
    sessionTag: '',
    utterance: '',
    messages: [],
    previousDetectedIntent: {
      contexts: []
    },
    anchorEl: null,
    open: false
  };

  componentDidMount() {
    const { router } = this.props;
    this.setState({
      sessionTag: router.query.projectId + Math.random()
    });
  }

  handleClick = event => {
    const { currentTarget } = event;
    const { router } = this.props;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
      messages: [],
      sessionTag: router.query.projectId + Math.random()
    }));
  };

  onChangeUtterance = event => {
    const { currentTarget } = event;
    this.setState({
      utterance: currentTarget.value
    });
  };

  detectIntent = event => {
    event.preventDefault();
    const { utterance, sessionTag, previousDetectedIntent } = this.state;
    this.setState(state => ({
      utterance: '',
      messages: [...state.messages, { key: Date.now(), text: utterance }]
    }));
    const { router, detectIntent } = this.props;
    detectIntent({
      id: router.query.projectId,
      utterance,
      sessionTag,
      contexts: previousDetectedIntent.contexts.map(context => ({
        name: context.name,
        lifespanCount: context.lifespanCount,
        parameters: context.parameters.map(parameter => ({
          name: parameter.name,
          value: JSON.stringify(parameter.value)
        }))
      }))
    }).then(response => {
      const { detectIntent: detectedIntent } = response.data;
      const formatedDetectedIntent = {
        key: Date.now(),
        ...detectedIntent,
        contexts: detectedIntent.contexts.map(context => ({
          ...context,
          parameters: context.parameters.map(parameter => ({
            ...parameter,
            value: JSON.parse(parameter.value)
          }))
        })),
        parameters: detectedIntent.parameters.map(parameter => ({
          ...parameter,
          value: JSON.parse(parameter.value)
        }))
      };
      this.setState(state => ({
        previousDetectedIntent: formatedDetectedIntent,
        messages: [...state.messages, formatedDetectedIntent]
      }));
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open, utterance, messages } = this.state;
    const id = open ? 'evaluator-popper' : null;

    return (
      <div>
        <Fab
          size="medium"
          className={classes.toggleButton}
          aria-describedby={id}
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          {open ? <StopIcon /> : <PlayIcon />}
        </Fab>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          placement="top-end"
          modifiers={{
            offset: { offset: '18px, 0' },
            preventOverflow: {
              enabled: true,
              padding: 0
            }
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.container}>
                <div className={classes.infoContainer}>
                  {messages.map((message, index) =>
                    index % 2 === 0 ? (
                      <UserMessage key={message.key} text={message.text} />
                    ) : (
                      <BotMessage key={message.key} detectedIntent={message} />
                    )
                  )}
                </div>
                <Divider />
                <div className={classes.inputContainer}>
                  <form onSubmit={this.detectIntent} id="DetectIntentInput">
                    <InputBase
                      autoFocus
                      fullWidth
                      placeholder="Try it!"
                      value={utterance}
                      onChange={this.onChangeUtterance}
                    />
                  </form>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

Evaluator.defaultProps = {
  router: {}
};

Evaluator.propTypes = {
  classes: PropTypes.object.isRequired,
  detectIntent: PropTypes.func.isRequired,
  router: PropTypes.object
};

export default withStyles(style)(withRouter(connect(Evaluator)));
