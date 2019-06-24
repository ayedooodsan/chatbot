import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import Android from '@material-ui/icons/Android';
import PlatformContainer from './PlatformContainer';
import style from './style';

const RobotDialogInput = props => {
  const { classes, preview } = props;
  return (
    <React.Fragment>
      <form className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          {preview()}
          <PlatformContainer />
        </div>
        <div className={classes.buttonContainer}>
          <Button color="primary" type="submit" variant="contained">
            <Android />
            <Send />
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

RobotDialogInput.defaultProps = {
  preview: () => null
};

RobotDialogInput.propTypes = {
  classes: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  preview: PropTypes.func
};

export default withStyles(style)(RobotDialogInput);
