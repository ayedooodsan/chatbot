import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/Delete';

import style from './style';

class IntentBar extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focus = () => {
    this.inputRef.current.focus();
  };

  render() {
    const { value, classes, onChange, onSave } = this.props;
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
          <IconButton color="inherit" className={classes.whiteColor}>
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
  inputRef: PropTypes.func
};

export default withStyles(style)(IntentBar);
