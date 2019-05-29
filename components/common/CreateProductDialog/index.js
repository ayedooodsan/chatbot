import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const CreateProductDialog = props => {
  const [newProductName, setNewProductName] = useState('');
  const { open, handleClose, handleConfirm, message, placeholder } = props;
  const onChange = event => {
    setNewProductName(event.target.value);
  };
  const onSave = () => {
    handleConfirm(newProductName);
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSave();
  };
  useEffect(
    function onOpenChange() {
      if (open) {
        setNewProductName('');
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
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <TextField
            value={newProductName}
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
          <Button type="submit" color="primary" disabled={!newProductName}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CreateProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default CreateProductDialog;
