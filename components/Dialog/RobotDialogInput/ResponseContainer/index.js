import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';
import style from './style';

const ResponseContainer = ({
  children,
  label,
  classes,
  focus,
  error,
  onClickAway
}) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Paper
        elevation={0}
        className={classNames(classes.root, {
          [classes.focusRoot]: focus,
          [classes.errorRoot]: error,
          [classes.focusedErrorRoot]: error && focus
        })}
      >
        <InputLabel
          className={classNames(classes.inputLabel, {
            [classes.focusInputLabel]: focus,
            [classes.errorInputLabel]: error
          })}
        >
          {label}
        </InputLabel>
        {children}
      </Paper>
    </ClickAwayListener>
  );
};

ResponseContainer.defaultProps = {
  focus: false,
  error: false
};

ResponseContainer.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onClickAway: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  error: PropTypes.bool
};

export default withStyles(style)(ResponseContainer);
