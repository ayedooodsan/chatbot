import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Face from '@material-ui/icons/Face';
import Android from '@material-ui/icons/Android';
import PlayArrow from '@material-ui/icons/PlayArrow';
import style from './style';

const BubbleChat = props => {
  const { classes, type, children } = props;
  return type === 'other' ? (
    <div className={`${classes.li} ${classes.bubbleOther}`}>
      <div className={classes.avatarOther}>
        <div className={classes.img}>
          <Face className={classes.icon} />
        </div>
      </div>
      <div className={`${classes.messages} ${classes.otherMessages}`}>
        {children}
        <PlayArrow className={classes.yeausr} />
        <PlayArrow className={classes.wasekusr} />
      </div>
    </div>
  ) : (
    <div className={`${classes.li} ${classes.bubbleSelf}`}>
      <div className={classes.avatarSelf}>
        <div className={classes.img}>
          <Android className={classes.icon} />
        </div>
      </div>
      <div className={`${classes.messages} ${classes.selfMessages}`}>
        {children}
        <PlayArrow className={classes.yea} />
        <PlayArrow className={classes.wasek} />
      </div>
    </div>
  );
};

BubbleChat.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(style)(BubbleChat);
