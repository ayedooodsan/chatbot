import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const BackupDialog = props => {
  const [word, setWord] = useState('');
  const [backupFile, setBackupFile] = useState(null);
  const {
    open,
    handleClose,
    handleConfirm,
    message,
    actionName,
    subMessage,
    placeholder,
    classes
  } = props;

  const onChangeFile = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    if (validity.valid) {
      setBackupFile(file);
    }
  };

  const onChangeWord = event => {
    setWord(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleConfirm(backupFile);
  };

  useEffect(
    function onOpenChange() {
      if (open) {
        setWord('');
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
          <DialogContentText>{subMessage}</DialogContentText>
          <div className={classes.buttons}>
            <label htmlFor="uploadFile">
              <input
                accept=".zip"
                style={{ display: 'none' }}
                id="uploadFile"
                multiple
                type="file"
                onChange={onChangeFile}
              />
              <Button
                variant="outlined"
                component="span"
                className={classes.button}
              >
                Upload
              </Button>
            </label>
          </div>
          {backupFile && (
            <TextField
              value={word}
              onChange={onChangeWord}
              autoFocus
              placeholder={placeholder}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={word !== actionName} type="submit" color="primary">
            {actionName}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

BackupDialog.defaultProps = {
  actionName: ''
};

BackupDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  actionName: PropTypes.string
};

export default withStyles(style)(BackupDialog);
