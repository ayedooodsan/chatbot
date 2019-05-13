import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import style from './style';

const SimpleProductHead = props => {
  const { classes, title, noButton } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      {!noButton && (
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.whiteColor}
          >
            Save
          </Button>
        </div>
      )}
    </Paper>
  );
};

SimpleProductHead.defaultProps = {
  noButton: false
};

SimpleProductHead.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  noButton: PropTypes.bool
};

export default withStyles(style)(SimpleProductHead);
