import { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import style from './style';

const IntentField = props => {
  const { intialValue, onChange, onDelete, classes } = props;
  const [value, setValue] = useState(intialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleBlur = () => {
    if (intialValue !== value) {
      onChange(value);
    }
  };
  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        value={value}
        onChange={handleChange}
        inputProps={{
          onBlur: handleBlur
        }}
        autoFocus
        fullWidth
        className={classes.input}
        placeholder="User says"
      />
      <IconButton
        onClick={onDelete}
        className={classes.iconButton}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

IntentField.propTypes = {
  intialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(IntentField);
