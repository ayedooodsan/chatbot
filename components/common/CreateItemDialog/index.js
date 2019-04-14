import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const CreateItemDialog = props => {
  const [newItemName, setNewItemName] = useState('');
  const { open, handleClose, handleConfirm, message, placeholder } = props;
  const onChange = event => {
    setNewItemName(event.target.value);
  };
  const onSave = () => {
    handleConfirm(newItemName);
  };
  useEffect(
    function onOpenChange() {
      if (open) {
        setNewItemName('');
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
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <Input
          value={newItemName}
          onChange={onChange}
          autoFocus
          margin="dense"
          placeholder={placeholder}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateItemDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default CreateItemDialog;
