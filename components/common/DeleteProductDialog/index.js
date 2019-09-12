import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const DeleteProductDialog = props => {
  const [firstWord, setFirstWord] = useState('');
  const { open, handleClose, handleConfirm, message, subMessage } = props;
  const onChange = event => {
    setFirstWord(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleConfirm();
  };
  useEffect(
    function onOpenChange() {
      if (open) {
        setFirstWord('');
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
        id="DeleteProductDialog"
      >
        <DialogTitle id="form-dialog-title">{message}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subMessage}</DialogContentText>
          <TextField
            value={firstWord}
            onChange={onChange}
            autoFocus
            placeholder="DELETE"
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
            form="DeleteProductDialog"
            disabled={firstWord !== 'DELETE'}
            type="submit"
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

DeleteProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string.isRequired
};

export default DeleteProductDialog;
