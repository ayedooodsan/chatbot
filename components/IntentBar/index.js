import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import redirect from '../../libraries/redirect';

import style from './style';

class IntentBar extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      open: false,
      firstWord: ''
    };
  }

  onChange = event => {
    this.setState({ firstWord: event.target.value });
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  confirmDelete = async () => {
    const { onDelete, projectId } = this.props;
    await onDelete();
    this.handleClose();
    redirect({}, `/${projectId}/intent`);
  };

  render() {
    const { value, classes, onChange, onSave } = this.props;
    const { firstWord, open } = this.state;
    return (
      <div className={classes.root}>
        <TextField
          className={`${classes.whiteColor} ${classes.input}`}
          inputRef={this.inputRef}
          onChange={onChange}
          value={value}
          rowsMax="4"
          placeholder="Untitled Intent"
          margin="none"
          fullWidth
        />
        <div>
          <IconButton
            onClick={this.handleOpen}
            color="inherit"
            className={classes.whiteColor}
          >
            <Delete />
          </IconButton>
          <Button
            onClick={onSave}
            variant="contained"
            color="primary"
            className={classes.whiteColor}
          >
            Save
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Delete {value} Intent
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To delete this intent, please enter the first word on title
              intent.
            </DialogContentText>
            <TextField
              autoFocus
              value={firstWord}
              onChange={this.onChange}
              margin="dense"
              label="The First Word"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={firstWord !== value.split(' ')[0]}
              onClick={this.confirmDelete}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

IntentBar.defaultProps = {
  inputRef: () => null
};

IntentBar.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  intentId: PropTypes.string.isRequired,
  inputRef: PropTypes.func
};

export default withStyles(style)(IntentBar);
