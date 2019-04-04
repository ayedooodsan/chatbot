import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MyCard from '../MyCard';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  mediumMarginTop: {
    marginTop: theme.spacing.unit * 1.5
  }
});

const Signin = props => {
  const { classes } = props;
  return (
    <MyCard headerText="Sign In">
      <FormControl fullWidth className={classes.margin}>
        <InputLabel
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }}
        >
          Username
        </InputLabel>
        <Input
          id="custom-css-standard-input"
          classes={{
            underline: classes.cssUnderline
          }}
        />
      </FormControl>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }}
        >
          Password
        </InputLabel>
        <Input
          type="password"
          id="custom-css-standard-input"
          classes={{
            underline: classes.cssUnderline
          }}
        />
      </FormControl>
      <div className={classes.mediumMarginTop}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.margin}
        >
          Sign in
        </Button>
        <Button size="small" color="primary" className={classes.margin}>
          Sign up
        </Button>
      </div>
    </MyCard>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
