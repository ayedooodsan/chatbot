import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Delete from '@material-ui/icons/Delete';
import { isTypeOfString } from '../../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  return () => {
    const {
      send,
      payload: { index }
    } = props;
    send({ index });
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
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  const title = useField('title', form);
  const { classes, preview, payload } = props;
  return (
    <React.Fragment>
      {preview()}
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          <TextField
            inputRef={inputRef}
            label="First word"
            margin="none"
            variant="filled"
            fullWidth
            InputProps={title.input}
            error={title.meta.touched && isTypeOfString(title.meta.error)}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            type="submit"
            disabled={
              prestine ||
              submitting ||
              title.input.value !== payload.message.split(' ')[0]
            }
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
  payload: PropTypes.object.isRequired,
  preview: PropTypes.func
};

export default withStyles(style)(DeleteMessageDialogInput);
