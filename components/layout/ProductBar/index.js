import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/Delete';
import DeleteItemDialog from '../../common/DeleteItemDialog';

import redirect from '../../../libraries/redirect';
import style from './style';

class ProductBar extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.inputRef.current.focus();
    }
  }

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
    const {
      itemName,
      classes,
      onChange,
      onSave,
      deleteMessage,
      deleteSubMessage
    } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <TextField
          className={`${classes.whiteColor} ${classes.input}`}
          inputRef={this.inputRef}
          onChange={onChange}
          value={itemName}
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
        <DeleteItemDialog
          open={open}
          handleClose={this.handleClose}
          handleConfirm={this.confirmDelete}
          message={deleteMessage}
          subMessage={deleteSubMessage}
          itemName={itemName}
        />
      </div>
    );
  }
}

ProductBar.defaultProps = {
  autoFocus: false
};

ProductBar.propTypes = {
  itemName: PropTypes.string.isRequired,
  deleteMessage: PropTypes.string.isRequired,
  deleteSubMessage: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool
};

export default withStyles(style)(ProductBar);
