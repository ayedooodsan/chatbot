import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';

import style from './style';

const UploadProductDialog = props => {
  const [newProductName, setNewProductName] = useState(null);
  const {
    open,
    handleClose,
    handleConfirm,
    message,
    submessage,
    placeholder,
    children,
    classes
  } = props;
  const onChange = file => {
    setNewProductName(file);
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
        <DialogTitle id="form-dialog-title">{message}</DialogTitle>
        <DialogContent>
          <DialogContentText>{submessage}</DialogContentText>
          {children && (
            <Paper className={classes.templateRoot} square elevation={0}>
              {children}
            </Paper>
          )}
          <label htmlFor="uploadFile">
            <input
              accept=".xlsx"
              className={classes.input}
              style={{ display: 'none' }}
              id="uploadFile"
              multiple
              type="file"
              onChange={({
                target: {
                  validity,
                  files: [file]
                }
              }) => validity.valid && onChange(file)}
            />
            <Button
              variant="raised"
              component="span"
              className={classes.button}
            >
              {placeholder}
            </Button>
          </label>
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

UploadProductDialog.defaultProps = {
  children: null
};

UploadProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  submessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.object
};

export default withStyles(style)(UploadProductDialog);
