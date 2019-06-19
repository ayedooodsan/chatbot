import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import style from './style';

const SimpleProductHead = props => {
  const { classes, title, noButton, renderButtons } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      {!noButton && renderButtons()}
    </Paper>
  );
};

SimpleProductHead.defaultProps = {
  noButton: false,
  renderButtons: () => null
};

SimpleProductHead.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  renderButtons: PropTypes.func,
  noButton: PropTypes.bool
};

export default withStyles(style)(SimpleProductHead);
