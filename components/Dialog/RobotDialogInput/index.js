import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Scrollbar from 'react-scrollbars-custom';
import {
  EDIT_ROBOT,
  EDIT_USER_PARAM,
  REPLY_USER_PARAM
} from '../DialogInput/constant';
import PlatformContainer from './PlatformContainer';
import TextEditor from '../../common/TextEditor';
import style from './style';

const RobotDialogInput = props => {
  const { classes, preview, payload, type, send } = props;
  let messages = [];
  let title = '';
  let actionName = '';
  if (type === EDIT_ROBOT) {
    messages = payload.payload ? payload.payload : [];
    // eslint-disable-next-line prefer-destructuring
    title = payload.title;
    // eslint-disable-next-line prefer-destructuring
    actionName = payload.actionName;
  } else if (type === EDIT_USER_PARAM) {
    messages = payload.param.prompts;
  }
  const [messageValues, setMessageValues] = useState(messages);
  const [messageTitle, setMessageTitle] = useState(title);
  const [messageActionName, setMessageActionName] = useState(actionName);
  return (
    <React.Fragment>
      <form className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          {preview()}
          {type === REPLY_USER_PARAM || type === EDIT_USER_PARAM ? (
            <TextEditor value={messageValues} onChange={setMessageValues} />
          ) : (
            <Scrollbar
              translateContentSizeYToHolder
              noScrollX
              style={{
                width: '100%',
                maxHeight: 'calc(100vh - 215px)'
              }}
              contentProps={{ style: { width: '100%', paddingRight: 5 } }}
            >
              <TextField
                className={classes.textField}
                autoFocus
                value={messageTitle}
                onChange={event => setMessageTitle(event.target.value)}
                label="Title"
                margin="dense"
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.textField}
                value={messageActionName}
                onChange={event => setMessageActionName(event.target.value)}
                label="Action Name"
                margin="dense"
                variant="outlined"
                fullWidth
              />
              <PlatformContainer
                activePlatform={payload.activePlatform}
                messages={messageValues}
                onMessagesChange={setMessageValues}
              />
            </Scrollbar>
          )}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() =>
              send({
                title: messageTitle,
                message: messageValues,
                actionName: messageActionName
              })
            }
          >
            Robot Send Message
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

RobotDialogInput.defaultProps = {
  preview: () => null,
  payload: {}
};

RobotDialogInput.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  payload: PropTypes.object,
  preview: PropTypes.func
};

export default withStyles(style)(RobotDialogInput);
