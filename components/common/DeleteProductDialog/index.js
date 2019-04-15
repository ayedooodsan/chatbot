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
  const {
    open,
    handleClose,
    handleConfirm,
    message,
    productName,
    subMessage
  } = props;
  const onChange = event => {
    setFirstWord(event.target.value);
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
      <DialogTitle id="form-dialog-title">{message}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subMessage}</DialogContentText>
        <TextField
          value={firstWord}
          onChange={onChange}
          autoFocus
          placeholder="The First Word"
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
          disabled={firstWord !== productName.split(' ')[0]}
          onClick={handleConfirm}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteProductDialog.defaultProps = {
  productName: ''
};

DeleteProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string.isRequired,
  productName: PropTypes.string
};

export default DeleteProductDialog;
