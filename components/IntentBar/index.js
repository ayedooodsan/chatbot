import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import CustomInput from '../CustomInput';

import style from './style';

const IntentBar = props => {
  const { value, classes } = props;
  return (
    <div className={classes.root}>
      <CustomInput
        justInput
        inputProps={{
          className: `${classes.whiteColor} ${classes.input}`,
          value,
          placeholder: 'Untitled Intent'
        }}
      />
      <div>
        <IconButton color="inherit" className={classes.whiteColor}>
          <Delete />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          className={classes.whiteColor}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

IntentBar.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(IntentBar);
