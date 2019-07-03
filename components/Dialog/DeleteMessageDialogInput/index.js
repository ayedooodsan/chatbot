import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  return () => {
    props.send();
  };
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  return errors;
};

const DeleteMessageDialogInput = props => {
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    validate
  });
  const title = useField('title', form);
  const { classes, preview } = props;
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          {preview()}
          <TextField
            autoFocus
            label="Type here"
            margin="dense"
            variant="outlined"
            fullWidth
            InputProps={title.input}
            error={title.meta.touched && isTypeOfString(title.meta.error)}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            disabled={prestine || submitting || title.input.value !== 'DELETE'}
          >
            Delete Message
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
