import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Reply from '@material-ui/icons/Reply';
import BubbleChat from '../BubbleChat';
import style from './style';
import { REPLY_ROBOT, EDIT_ROBOT, DELETE_ROBOT } from './constant';

const RobotMessage = props => {
  const {
    classes,
    onChangeDialogInput,
    messages,
    activeChildMessageId
  } = props;
  const activeMessage = messages[0];
  return (
    <BubbleChat type="self">
      <div className={classes.headerBubble}>
        <Typography variant="subtitle2">{activeMessage.payload}</Typography>
        <div className={classes.buttons}>
          {!activeChildMessageId && (
            <IconButton
              className={classes.iconButton}
              onClick={() => {
                onChangeDialogInput({
                  type: REPLY_ROBOT,
                  payload: activeMessage
                });
              }}
            >
              <Reply className={classes.miniIcon} />
            </IconButton>
          )}
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              onChangeDialogInput({
                type: EDIT_ROBOT,
                payload: activeMessage
              });
            }}
          >
            <Edit className={classes.miniIcon} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              onChangeDialogInput({
                type: DELETE_ROBOT,
                payload: activeMessage
              });
            }}
          >
            <Delete className={classes.miniIcon} />
          </IconButton>
        </div>
      </div>
    </BubbleChat>
  );
};

RobotMessage.propTypes = {
  messages: PropTypes.array.isRequired,
  activeChildMessageId: PropTypes.number.isRequired,
  onChangeDialogInput: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(RobotMessage);
