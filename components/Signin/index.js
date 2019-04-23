import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import redirect from '../../libraries/redirect';
import { isTypeOfString } from '../../libraries/helpers';
import { Link } from '../../routes';
import connect from './store';
import style from './style';

const onSubmit = props => {
  return values => {
    props.mutations.signIn(values).then(response => {
      if (response.data.signIn.token) {
        const { token, refreshToken, me } = response.data.signIn;
        props.actions.signIn(token, refreshToken);
        const projectId = me.activeProject.id;
        redirect({}, `/${projectId}/entity`);
      }
    });
  };
};

const validate = values => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const Signin = props => {
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    validate
  });
  const login = useField('login', form);
  const password = useField('password', form);
  const { classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader color="success" title="SIGN IN" />
        <CardContent className={classes.cardContent}>
          <TextField
            label="Username"
            margin="dense"
            variant="outlined"
            fullWidth
            helperText={login.meta.touched && login.meta.error}
            {...login.input}
            error={login.meta.touched && isTypeOfString(login.meta.error)}
          />
          <TextField
            label="Password"
            margin="dense"
            variant="outlined"
            type="password"
            fullWidth
            helperText={password.meta.touched && password.meta.error}
            {...password.input}
            error={password.meta.touched && isTypeOfString(password.meta.error)}
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={prestine || submitting}
          >
            Sign in
          </Button>
          <Link route="/sign-up">
            <Button color="primary">Sign up</Button>
          </Link>
        </CardActions>
      </Card>
    </form>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(connect(Signin));
