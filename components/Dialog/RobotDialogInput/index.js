import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import Android from '@material-ui/icons/Android';
import { EDIT_ROBOT, EDIT_USER_PARAM } from '../DialogInput/constant';
import PlatformContainer from './PlatformContainer';
import style from './style';

const RobotDialogInput = props => {
  const { classes, preview, payload, type, send } = props;
  let messages = [];
  if (type === EDIT_ROBOT) {
    messages = payload.payload ? payload.payload : [];
  } else if (type === EDIT_USER_PARAM) {
    messages = payload.prompts;
  }
  const [messageValues, setMessageValues] = useState(messages);
  return (
    <React.Fragment>
      <form className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          {preview()}
          <PlatformContainer
            messages={messageValues}
            onChange={newMessageValues => setMessageValues(newMessageValues)}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => send({ message: messageValues })}
          >
            <Android />
            <Send />
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
