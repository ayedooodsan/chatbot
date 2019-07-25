import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';

const SuggestionView = props => {
  const { value, classes } = props;
  return (
    <React.Fragment>
      <Typography variant="caption">These are my suggestions:</Typography>
      {value.suggestions.map(suggestion => (
        <Chip
          key={suggestion}
          label={suggestion}
          variant="outlined"
          className={classes.chip}
        />
      ))}
    </React.Fragment>
  );
};

SuggestionView.propTypes = {
  value: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(SuggestionView);
