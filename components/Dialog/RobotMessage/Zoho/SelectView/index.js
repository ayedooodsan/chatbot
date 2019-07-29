import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';

const SelectView = props => {
  const { value, classes } = props;
  return (
    <React.Fragment>
      <Typography variant="caption">Please, select one:</Typography>
      {value.options.map(option => (
        <Chip
          key={option}
          label={option}
          variant="outlined"
          className={classes.chip}
        />
      ))}
    </React.Fragment>
  );
};

SelectView.propTypes = {
  value: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(SelectView);
