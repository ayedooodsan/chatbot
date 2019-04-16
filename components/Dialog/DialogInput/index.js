import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PreviewMessage from '../PreviewMessage';
import RobotDialogInput from '../RobotDialogInput';
import UserDialogInput from '../UserDialogInput';
import DeleteMessageDialogInput from '../DeleteMessageDialogInput';
import style from './style';
import {
  START_MESSAGE,
  REPLY_USER,
  REPLY_USER_PARAM,
  EDIT_USER,
  EDIT_USER_PARAM,
  DELETE_USER,
  DELETE_USER_PARAM,
  REPLY_ROBOT,
  EDIT_ROBOT,
  DELETE_ROBOT
} from './constant';

const DialogInput = props => {
  const { type, payload, send, classes, reset } = props;
  let Element = null;
  switch (type) {
    case REPLY_ROBOT: {
      Element = (
        <UserDialogInput
          preview={() => (
            <PreviewMessage
              title="REPLY ROBOT SAYS:"
              subtitle={payload.payload}
              reset={reset}
            />
          )}
          send={send}
          type={REPLY_ROBOT}
          payload={payload}
        />
      );
      break;
    }
    case START_MESSAGE: {
      Element = (
        <UserDialogInput
          preview={() => (
            <PreviewMessage title="START WITH USER SAYS:" reset={reset} />
          )}
          send={send}
          type={REPLY_ROBOT}
          payload={payload}
        />
      );
      break;
    }
    case EDIT_ROBOT: {
      Element = (
        <RobotDialogInput
          preview={() => (
            <PreviewMessage
              title="EDIT ROBOT SAYS:"
              subtitle={payload.payload}
              reset={reset}
            />
          )}
          send={send}
          type={EDIT_ROBOT}
        />
      );
      break;
    }
    case DELETE_ROBOT: {
      Element = (
        <DeleteMessageDialogInput
          preview={() => (
            <PreviewMessage
              title="DELETE ROBOT SAYS:"
              subtitle={payload.payload}
              footTitle="Type the the first word and click the send button."
              reset={reset}
            />
          )}
          send={send}
          type={DELETE_ROBOT}
          payload={payload}
        />
      );
      break;
    }
    case REPLY_USER: {
      Element = (
        <RobotDialogInput
          preview={() => (
            <PreviewMessage
              title="REPLY USER SAYS:"
              subtitle={payload.title}
              reset={reset}
            />
          )}
          send={send}
          type={REPLY_USER}
        />
      );
      break;
    }
    case REPLY_USER_PARAM: {
      Element = (
        <RobotDialogInput
          preview={() => (
            <PreviewMessage
              title={`REPLY USER DOESN'T SAYS "${payload.param.name.toUpperCase()}" PARAMETER:`}
              subtitle={payload.message.title}
              reset={reset}
            />
          )}
          send={send}
          type={REPLY_USER_PARAM}
          payload={payload}
        />
      );
      break;
    }
    case EDIT_USER_PARAM: {
      Element = (
        <RobotDialogInput
          preview={() => (
            <PreviewMessage
              title={`EDIT ROBOT SAYS ABOUT "${payload.param.name.toUpperCase()}" PARAMETER DOESN'T APPEAR:`}
              subtitle={payload.param.message}
              reset={reset}
            />
          )}
          send={send}
          type={EDIT_USER_PARAM}
          payload={payload}
        />
      );
      break;
    }
    case EDIT_USER: {
      Element = (
        <UserDialogInput
          preview={() => (
            <PreviewMessage
              title="EDIT USER SAYS:"
              subtitle={payload.title}
              reset={reset}
            />
          )}
          send={send}
          type={EDIT_USER}
          payload={payload}
        />
      );
      break;
    }
    case DELETE_USER_PARAM: {
      Element = (
        <DeleteMessageDialogInput
          preview={() => (
            <PreviewMessage
              title={`DELETE ROBOT SAYS ABOUT "${payload.param.name.toUpperCase()}" PARAMETER DOESN'T APPEAR:`}
              subtitle={payload.param.message}
              footTitle="Type the first and click the send button."
              reset={reset}
            />
          )}
          send={send}
          type={DELETE_USER_PARAM}
          payload={payload}
        />
      );
      break;
    }
    case DELETE_USER: {
      Element = (
        <DeleteMessageDialogInput
          preview={() => (
            <PreviewMessage
              title="DELETE USER SAYS:"
              subtitle={payload.title}
              footTitle="Type the title and click the send button."
              reset={reset}
            />
          )}
          send={send}
          type={DELETE_USER}
          payload={payload}
        />
      );
      break;
    }
    default: {
      Element = (
        <Paper elevation={0} className={classes.emptyAction}>
          <Typography variant="subtitle2" color="primary">
            {"DIALOG INPUT DOESN'T SHOW"}
          </Typography>
          <Typography variant="caption" color="primary">
            Please click the reply / edit / delete button.
          </Typography>
        </Paper>
      );
      break;
    }
  }
  return Element;
};

DialogInput.propTypes = {
  type: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(DialogInput);
