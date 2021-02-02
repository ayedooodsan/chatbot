import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
// import PlayIcon from '@material-ui/icons/PlayArrow';
// import StopIcon from '@material-ui/icons/Stop';
import { withRouter } from 'next/router';
import Scrollbar from 'react-scrollbars-custom';
import Bubblechat from '../common/BubbleChat';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import BotLoading from './BotLoading';
import DialogflowMesseger from '../DialogflowMesseger';
import redirect from '../../libraries/redirect';
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
    free: true,
    open: false
  };

  projectTrainingNotificationKey = null;

  unsubscribeProjectTraining = null;

  unsubscribeProjectTrained = null;

  componentDidMount() {
    const { router } = this.props;
    this.setState({
      sessionTag: router.query.projectId + Math.random()
    });
    this.subscribeProjectTrainingInfo();
  }

  componentDidUpdate(prevProps) {
    const {
      subscribeProjectTraining,
      subscribeProjectTrained,
      me: { username }
    } = this.props;
    if (
      prevProps.subscribeProjectTraining !== subscribeProjectTraining &&
      prevProps.subscribeProjectTrained !== subscribeProjectTrained
    ) {
      this.subscribeProjectTrainingInfo();
    }
    this.setUsername(username);
  }

  componentWillUnmount() {
    if (this.unsubscribeProjectTraining) {
      this.unsubscribeProjectTraining();
    }
    if (this.unsubscribeProjectTrained) {
      this.unsubscribeProjectTrained();
    }
  }

  handleClick = event => {
    const { currentTarget } = event;
    const { router } = this.props;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
      messages: [],
      previousDetectedIntent: {
        contexts: []
      },
      sessionTag: router.query.projectId + Math.random()
    }));
  };

  resetContexts = () => {
    const { router } = this.props;
    this.setState({
      messages: [],
      previousDetectedIntent: {
        contexts: []
      },
      sessionTag: router.query.projectId + Math.random()
    });
  };

  onChangeUtterance = event => {
    const { currentTarget } = event;
    this.setState({
      utterance: currentTarget.value
    });
  };

  trainProject = () => {
    const { router, trainProject } = this.props;
    this.setState({
      training: true
    });
    trainProject({ id: router.query.projectId })
      .then(() => {
        setTimeout(() => {
          this.setState({
            training: false
          });
        }, 3000);
      })
      .catch(() => {
        this.setState({
          training: false
        });
      });
  };

  detectIntent = event => {
    event.preventDefault();
    const { utterance, sessionTag, previousDetectedIntent } = this.state;
    this.setState(
      state => ({
        utterance: '',
        messages: [
          ...state.messages,
          { key: new Date().getTime(), text: utterance },
          null
        ]
      }),
      () => {
        this.scrollbar.scrollToBottom();
      }
    );
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
        key: new Date().getTime(),
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
      this.setState(
        state => {
          const newMessages = [...state.messages];
          newMessages[newMessages.length - 2] = {
            ...newMessages[newMessages.length - 2],
            dialogName: formatedDetectedIntent.dialogName
          };
          newMessages[newMessages.length - 1] = formatedDetectedIntent;
          return {
            previousDetectedIntent: formatedDetectedIntent,
            messages: newMessages
          };
        },
        () => {
          this.scrollbar.scrollToBottom();
        }
      );
    });
  };

  freeDetectIntent = event => {
    event.preventDefault();
    const { utterance, sessionTag } = this.state;
    this.setState(
      state => ({
        utterance: '',
        messages: [
          ...state.messages,
          { key: new Date().getTime(), text: utterance },
          null
        ]
      }),
      () => {
        this.scrollbar.scrollToBottom();
      }
    );
    const { router, freeDetectIntent } = this.props;
    freeDetectIntent({
      id: router.query.projectId,
      utterance,
      sessionTag
    }).then(response => {
      const { freeDetectIntent: freeDetectedIntent } = response.data;
      this.setState(
        state => {
          const newMessages = [...state.messages];
          newMessages[newMessages.length - 2] = {
            ...newMessages[newMessages.length - 2]
          };
          newMessages[newMessages.length - 1] = {
            key: new Date().getTime(),
            text: freeDetectedIntent
          };
          return {
            messages: newMessages
          };
        },
        () => {
          this.scrollbar.scrollToBottom();
        }
      );
    });
  };

  redirectGeneralSetting = () => {
    const { router } = this.props;
    redirect({}, `/${router.query.projectId}/setting/general`);
  };

  setUsername = username => {
    const { actions } = this.props;
    actions.setUserMeInfo(username);
  };

  subscribeProjectTrainingInfo() {
    const {
      router,
      subscribeProjectTraining,
      subscribeProjectTrained
    } = this.props;
    if (subscribeProjectTraining) {
      if (this.unsubscribeProjectTraining) {
        this.unsubscribeProjectTraining();
      }
      this.unsubscribeProjectTraining = subscribeProjectTraining({
        id: router.query.projectId,
        onSubscriptionData: userName => {
          const { me, actions } = this.props;
          if (me.username !== userName) {
            this.setState({
              training: true,
              open: false
            });
            this.projectTrainingNotificationKey = actions.notify({
              message: `Project training started by ${userName}. Your last update at this moment also will be trained.`,
              variant: 'info',
              autoHideDuration: 120000
            });
          }
        }
      });
    }
    if (subscribeProjectTrained) {
      if (this.unsubscribeProjectTrained) {
        this.unsubscribeProjectTrained();
      }
      this.unsubscribeProjectTrained = subscribeProjectTrained({
        id: router.query.projectId,
        onSubscriptionData: userName => {
          const { me, actions, project } = this.props;
          if (me.username !== userName) {
            if (this.projectTrainingNotificationKey) {
              actions.closeNotification(this.projectTrainingNotificationKey);
              this.projectTrainingNotificationKey = null;
            }
            this.setState({
              training: false
            });
            let message = `Project training by ${userName} completed.`;
            if (project.needTrain) {
              message +=
                ' You can train again to make sure your new data trained.';
            }
            actions.notify({
              message,
              variant: 'success',
              autoHideDuration: 10000
            });
          }
        }
      });
    }
  }

  render() {
    const { classes, project } = this.props;
    const { anchorEl, open, utterance, messages, training, free } = this.state;
    const id = open ? 'evaluator-popper' : null;
    let trainButtonText = '';
    if (training) {
      trainButtonText = 'Training';
    } else if (project.needTrain) {
      trainButtonText = 'Train';
    } else {
      trainButtonText = 'Trained';
    }
    return (
      <div>
        <div
          className={classes.buttonContainer}
          style={{ right: project.agentId ? 90 : 20 }}
        >
          <div className={classes.trainWrapper}>
            <Fab
              className={classes.button}
              variant="extended"
              size="large"
              color="primary"
              disabled={training || !project.needTrain}
              onClick={this.trainProject}
            >
              {trainButtonText}
            </Fab>
            {training && (
              <CircularProgress size={24} className={classes.trainProgress} />
            )}
          </div>
          {/* <Fab
            className={classes.button}
            disabled={training}
            size="medium"
            aria-describedby={id}
            color="primary"
            onClick={this.handleClick}
          >
            {open ? <StopIcon /> : <PlayIcon />}
          </Fab> */}
          {project.agentId ? (
            <DialogflowMesseger
              title={project.title}
              agentId={project.agentId}
            />
          ) : (
            <>
              <Fab
                className={classes.button}
                variant="extended"
                size="large"
                color="primary"
                onClick={() => this.redirectGeneralSetting()}
              >
                <SettingsIcon style={{ marginRight: 5 }} /> Set Agent ID
              </Fab>
            </>
          )}
        </div>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          placement="top-end"
          style={{ zIndex: 2000 }}
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
                  <Scrollbar
                    ref={ref => {
                      this.scrollbar = ref;
                    }}
                    contentProps={{
                      style: { width: '100%', paddingRight: 5, paddingTop: 5 }
                    }}
                  >
                    {messages.map((message, index) =>
                      index % 2 === 0 ? (
                        <React.Fragment key={message.key}>
                          {!free && (
                            <UserMessage
                              text={message.text}
                              dialogName={
                                (index === 0 ||
                                  message.dialogName !==
                                    messages[index - 2].dialogName) &&
                                message.dialogName
                                  ? message.dialogName
                                  : null
                              }
                            />
                          )}
                          {free && (
                            <Bubblechat type="other">
                              <Typography variant="caption">
                                {message.text}
                              </Typography>
                            </Bubblechat>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {message && !free && (
                            <BotMessage
                              key={message.key}
                              detectedIntent={message}
                            />
                          )}
                          {message && free && (
                            <Bubblechat type="self">
                              <Typography variant="caption">
                                {message.text ? (
                                  message.text
                                ) : (
                                  <i>Empty Response</i>
                                )}
                              </Typography>
                            </Bubblechat>
                          )}
                          {!message && <BotLoading />}
                        </React.Fragment>
                      )
                    )}
                  </Scrollbar>
                </div>
                <Divider />
                <form
                  onSubmit={free ? this.freeDetectIntent : this.detectIntent}
                  id="DetectIntentInput"
                  className={classes.inputContainer}
                >
                  <InputBase
                    autoFocus
                    fullWidth
                    placeholder="Try it!"
                    value={utterance}
                    onChange={this.onChangeUtterance}
                  />
                  <IconButton onClick={() => this.resetContexts()}>
                    <Delete />
                  </IconButton>
                </form>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

Evaluator.defaultProps = {
  router: {},
  project: {},
  projectSetting: {},
  me: {},
  subscribeProjectTraining: null,
  subscribeProjectTrained: null
};

Evaluator.propTypes = {
  classes: PropTypes.object.isRequired,
  detectIntent: PropTypes.func.isRequired,
  freeDetectIntent: PropTypes.func.isRequired,
  trainProject: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  subscribeProjectTraining: PropTypes.func,
  subscribeProjectTrained: PropTypes.func,
  me: PropTypes.object,
  project: PropTypes.object,
  projectSetting: PropTypes.object,
  router: PropTypes.object
};

export default withStyles(style)(withRouter(connect(Evaluator)));
