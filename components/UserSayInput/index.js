import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Face from '@material-ui/icons/Face';
import { isTypeOfString } from '../../libraries/helpers';
import style from './style';

const onSubmit = props => {
  return values => {
    const {
      send,
      payload: { index }
    } = props;
    send({ value: values.message, index });
  };
};

const validate = values => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Message is required';
  }
  return errors;
};

const UserSayInput = props => {
  const { classes, preview, payload } = props;
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    initialValues: {
      message: payload.message
    },
    validate
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [payload]);

  const message = useField('message', form);

  useEffect(() => {
    if (message.meta.submitSucceeded) {
      form.reset();
      inputRef.current.focus();
    }
  }, [message]);

  return (
    <React.Fragment>
      {preview()}
      <form onSubmit={handleSubmit} className={classes.root}>
        <div className={`${classes.inputContainer} ${classes.margin}`}>
          <TextField
            inputRef={inputRef}
            multiline
            rowsMax="4"
            label="Message"
            margin="none"
            variant="filled"
            fullWidth
            InputProps={message.input}
            error={
              message.meta.submitFailed && isTypeOfString(message.meta.error)
            }
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            type="submit"
            disabled={prestine || submitting}
          >
            <Face />
            <Send />
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

UserSayInput.defaultProps = {
  preview: () => null,
  payload: { message: '', index: 0 }
};

UserSayInput.propTypes = {
  classes: PropTypes.object.isRequired,
  payload: PropTypes.object,
  preview: PropTypes.func
};

export default withStyles(style)(UserSayInput);
