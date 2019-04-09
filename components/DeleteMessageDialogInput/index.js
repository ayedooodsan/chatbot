import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Delete from '@material-ui/icons/Delete';
import { isTypeOfString } from '../../libraries/helpers';
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

const DeleteMessageDialogInput = props => {
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    validate
  });
  const message = useField('message', form);
  const { classes, preview } = props;
  return (
    <React.Fragment>
      {preview()}
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          <TextField
            label="Title"
            margin="none"
            variant="filled"
            fullWidth
            InputProps={message.input}
            error={message.meta.touched && isTypeOfString(message.meta.error)}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            type="submit"
            disabled={prestine || submitting}
          >
            <Delete />
            <Send />
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

DeleteMessageDialogInput.defaultProps = {
  preview: () => null
};

DeleteMessageDialogInput.propTypes = {
  classes: PropTypes.object.isRequired,
  preview: PropTypes.func
};

export default withStyles(style)(DeleteMessageDialogInput);
