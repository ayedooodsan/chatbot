import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Face from '@material-ui/icons/Face';
import Android from '@material-ui/icons/Android';
import style from './style';

const BubbleChat = props => {
  const { classes, type, children, selected, dense, className } = props;
  return type === 'other' ? (
    <div
      className={classNames(classes.li, classes.bubbleOther, className, {
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
      </div>
    </div>
  ) : (
    <div
      className={classNames(classes.li, classes.bubbleSelf, className, {
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
      </div>
    </div>
  );
};

BubbleChat.defaultProps = {
  selected: false,
  dense: false,
  className: ''
};

BubbleChat.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool,
  selected: PropTypes.bool
};

export default withStyles(style)(BubbleChat);
