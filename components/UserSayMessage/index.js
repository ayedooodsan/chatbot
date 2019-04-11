import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import BubbleChat from '../BubbleChat';

import style from './style';
import { EDIT, DELETE } from '../IntentInput/constant';

const UserSayMessage = props => {
  const { classes, onChangeIntentInput, message, index } = props;
  return (
    <BubbleChat type="other">
      <div className={classes.headerBubble}>
        <Typography variant="subtitle2">{message}</Typography>
        <div className={classes.buttons}>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              onChangeIntentInput({
                type: EDIT,
                payload: { message, index }
              });
            }}
          >
            <Edit className={classes.miniIcon} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              onChangeIntentInput({
                type: DELETE,
                payload: { message, index }
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

UserSayMessage.propTypes = {
  message: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIntentInput: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(UserSayMessage);
