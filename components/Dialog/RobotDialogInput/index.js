import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Android from '@material-ui/icons/Android';
import Add from '@material-ui/icons/Add';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  return values => {
    props.send(values);
  };
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.intent) {
    errors.intent = 'Intent is required';
  }
  return errors;
};

const RobotDialogInput = props => {
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    validate
  });
  const message = useField('message', form);
  const { classes, preview } = props;
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={classes.buttonContainer}>
          <IconButton color="primary">
            <Add />
          </IconButton>
        </div>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          {preview()}
          <TextField
            multiline
            rowsMax="4"
            label="Message"
            margin="dense"
            variant="outlined"
            fullWidth
            InputProps={message.input}
            error={message.meta.touched && isTypeOfString(message.meta.error)}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={prestine || submitting}
          >
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
  preview: PropTypes.func
};

export default withStyles(style)(RobotDialogInput);
