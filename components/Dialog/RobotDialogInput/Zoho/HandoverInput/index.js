import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Launch from '@material-ui/icons/Launch';
import TextField from '@material-ui/core/TextField';
import style from './style';

class ZohoHandoverInput extends React.Component {
  onInputChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { classes, error, label, value } = this.props;
    return (
      <Paper
        elevation={0}
        className={classNames(classes.root, {
          [classes.errorRoot]: error
        })}
      >
        {label && (
          <InputLabel
            className={classNames(classes.inputLabel, {
              [classes.errorInputLabel]: error
            })}
          >
            {label}
          </InputLabel>
        )}
        <div
          className={classNames(
            classes.inputRoot,
            classes.multiline,
            classes.fullWidth
          )}
        >
          <div className={classNames(classes.input, classes.inputMultiline)}>
            <Launch />
            <TextField
              value={value}
              className={classes.inputTextZoho}
              placeholder="Input Department ID"
              onChange={this.onInputChange}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

ZohoHandoverInput.defaultProps = {
  error: false,
  value: [],
  label: null
};

ZohoHandoverInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  error: PropTypes.bool,
  label: PropTypes.string
};

export default withStyles(style)(ZohoHandoverInput);
