import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ActionConfirmDialog = props => {
  const [wordInput, setWordInput] = useState('');
  const {
    open,
    handleClose,
    handleConfirm,
    message,
    actionName,
    placeholder,
    subMessage
  } = props;
  const onChange = event => {
    setWordInput(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleConfirm();
  };
  useEffect(
    function onOpenChange() {
      if (open) {
        setWordInput('');
      }
    },
    [open]
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form
        onSubmit={event => {
          event.stopPropagation();
          handleSubmit(event);
        }}
        id="ActionConfirmDialog"
      >
        <DialogTitle id="form-dialog-title">{message}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subMessage}</DialogContentText>
          <TextField
            value={wordInput}
            onChange={onChange}
            autoFocus
            placeholder={placeholder}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            form="ActionConfirmDialog"
            disabled={wordInput !== actionName}
            type="submit"
            color="primary"
          >
            {actionName}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

ActionConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default ActionConfirmDialog;
