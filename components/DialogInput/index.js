import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RobotDialogInput from '../RobotDialogInput';
import UserDialogInput from '../UserDialogInput';
import DeleteMessageDialogInput from '../DeleteMessageDialogInput';
import style from './style';
import {
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
  const { type, payload, send, classes } = props;
  let Element = null;
  switch (type) {
    case REPLY_ROBOT: {
      Element = (
        <UserDialogInput
          preview={() => (
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                REPLY ROBOT SAYS:
              </Typography>
              <Typography variant="caption">{payload.payload}</Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                EDIT ROBOT SAYS:
              </Typography>
              <Typography variant="caption">{payload.payload}</Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                DELETE ROBOT SAYS:
              </Typography>
              <Typography variant="caption">{payload.payload}</Typography>
              <Typography variant="caption" color="primary">
                Type the the first word and click the send button.
              </Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                REPLY USER SAYS:
              </Typography>
              <Typography variant="caption">{payload.title}</Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                {`REPLY USER DOESN'T SAYS "${payload.param.name.toUpperCase()}" PARAMETER:`}
              </Typography>
              <Typography variant="caption">{payload.message.title}</Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                {`EDIT ROBOT SAYS ABOUT "${payload.param.name.toUpperCase()}" PARAMETER DOESN'T APPEAR:`}
              </Typography>
              <Typography variant="caption">{payload.param.message}</Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                EDIT USER SAYS:
              </Typography>
              <Typography variant="caption">{payload.title}</Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                {`DELETE ROBOT SAYS ABOUT "${payload.param.name.toUpperCase()}" PARAMETER DOESN'T APPEAR:`}
              </Typography>
              <Typography variant="caption">{payload.param.message}</Typography>
              <Typography variant="caption" color="primary">
                Type the first and click the send button.
              </Typography>
            </Paper>
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
            <Paper elevation={0} className={classes.preview}>
              <Typography variant="subtitle2" color="primary">
                DELETE USER SAYS:
              </Typography>
              <Typography variant="caption">{payload.title}</Typography>
              <Typography variant="caption" color="primary">
                Type the title and click the send button.
              </Typography>
            </Paper>
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
