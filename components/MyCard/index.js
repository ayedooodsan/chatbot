import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: '15px'
  },
  paper: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 4.5,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
    maxWidth: 400
  },
  margin: {
    margin: theme.spacing.unit
  },
  padding: {
    padding: theme.spacing.unit
  },
  mediumMarginTop: {
    marginTop: theme.spacing.unit + 1.5
  },
  header: {
    position: 'absolute',
    top: '-15px',
    left: '5%',
    width: '90%',
    backgroundColor: theme.palette.primary.main
  },
  headerTitle: {
    padding: theme.spacing.unit,
    color: 'white'
  }
});

const MyCard = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Paper className={classes.header}>
          <Typography
            variant="h6"
            color="textPrimary"
            className={classes.headerTitle}
          >
            {props.headerText}
          </Typography>
        </Paper>
        <div>{props.children}</div>
      </Paper>
    </div>
  );
};

MyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  headerText: PropTypes.string.isRequired
};

export default withStyles(styles)(MyCard);
