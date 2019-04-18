import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Delete from '@material-ui/icons/Delete';
import DeleteProductDialog from '../../common/DeleteProductDialog';

import style from './style';

class ProductHead extends Component {
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

  componentDidUpdate(prevProps) {
    if (
      this.props.autoFocus &&
      prevProps.productName !== this.props.productName
    ) {
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
    const { onDelete } = this.props;
    await onDelete();
    this.handleClose();
  };

  render() {
    const {
      productName,
      classes,
      onChange,
      onSave,
      deleteMessage,
      deleteSubMessage
    } = this.props;
    const { open } = this.state;
    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          inputRef={this.inputRef}
          onChange={onChange}
          value={productName}
          rowsMax="4"
          placeholder="Untitled Intent"
          margin="none"
          fullWidth
        />
        <div>
          <IconButton onClick={this.handleOpen} color="primary">
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
        <DeleteProductDialog
          open={open}
          handleClose={this.handleClose}
          handleConfirm={this.confirmDelete}
          message={deleteMessage}
          subMessage={deleteSubMessage}
          productName={productName}
        />
      </Paper>
    );
  }
}

ProductHead.defaultProps = {
  autoFocus: false,
  productName: ''
};

ProductHead.propTypes = {
  deleteMessage: PropTypes.string.isRequired,
  deleteSubMessage: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  productName: PropTypes.string,
  autoFocus: PropTypes.bool
};

export default withStyles(style)(ProductHead);
