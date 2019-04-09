/* eslint-disable no-nested-ternary */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
// @material-ui/icons
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
// core components
import customInputStyle from './style';

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    helperText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    justInput
  } = props;

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  return justInput ? (
    <Input
      classes={{
        root: marginTop,
        disabled: classes.disabled,
        underline: underlineClasses
      }}
      id={id}
      {...inputProps}
    />
  ) : (
    <FormControl
      {...formControlProps}
      className={`${formControlProps.className}`}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
      ) : success ? (
        <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
      ) : null}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

CustomInput.defaultProps = {
  labelText: null,
  helperText: null,
  labelProps: null,
  id: null,
  inputProps: null,
  formControlProps: null,
  error: null,
  success: null,
  justInput: false
};

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  helperText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  justInput: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
