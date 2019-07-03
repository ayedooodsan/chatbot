import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Face from '@material-ui/icons/Face';
import Android from '@material-ui/icons/Android';
import PlayArrow from '@material-ui/icons/PlayArrow';
import style from './style';

const BubbleChat = props => {
  const { classes, type, children, selected, dense } = props;
  return type === 'other' ? (
    <div
      className={classNames(classes.li, classes.bubbleOther, {
        [classes.selectedLi]: selected,
        [classes.denseLi]: dense
      })}
    >
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
    <div
      className={classNames(classes.li, classes.bubbleSelf, {
        [classes.selectedLi]: selected,
        [classes.denseLi]: dense
      })}
    >
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

BubbleChat.defaultProps = {
  selected: false,
  dense: false
};

BubbleChat.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  dense: PropTypes.bool,
  selected: PropTypes.bool
};

export default withStyles(style)(BubbleChat);
