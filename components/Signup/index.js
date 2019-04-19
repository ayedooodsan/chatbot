import React from 'react';
import { useForm, useField } from 'react-final-form-hooks';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import connect from './store';
import redirect from '../../libraries/redirect';
import { isTypeOfString } from '../../libraries/helpers';
import { Link } from '../../routes';
import style from './style';

const onSubmit = props => {
  return values => {
    props.mutations.signUp(values).then(response => {
      if (response.data.signUp.token) {
        props.actions.signIn(response.data.signUp.token);
        const projectId = response.data.signUp.me.activeProject.id;
        redirect({}, `/${projectId}/dialog`);
      }
    });
  };
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (!values.email) {
    errors.email = 'Email address is required';
  }
  if (!values.password) {
    errors.password = 'Password address is required';
  } else if (values.password.length < 7) {
    errors.password = 'Password must be at least 7 characters';
  }
  return errors;
};

const Signup = props => {
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit: onSubmit(props),
    validate
  });
  const username = useField('username', form);
  const email = useField('email', form);
  const firstName = useField('firstName', form);
  const lastName = useField('lastName', form);
  const password = useField('password', form);
  const { classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          color="success"
          title="Create Accout"
          subheader="Complete your account"
        />
        <CardContent className={classes.cardContent}>
          <TextField
            label="Username"
            margin="dense"
            variant="outlined"
            fullWidth
            {...username.input}
            helperText={username.meta.touched && username.meta.error}
            error={username.meta.touched && isTypeOfString(username.meta.error)}
          />
          <TextField
            label="Email address"
            margin="dense"
            variant="outlined"
            fullWidth
            helperText={email.meta.touched && email.meta.error}
            {...email.input}
            error={email.meta.touched && isTypeOfString(email.meta.error)}
          />
          <TextField
            label="First Name"
            margin="dense"
            variant="outlined"
            fullWidth
            helperText={firstName.meta.touched && firstName.meta.error}
            {...firstName.input}
            error={
              firstName.meta.touched && isTypeOfString(firstName.meta.error)
            }
          />
          <TextField
            label="Last Name"
            margin="dense"
            variant="outlined"
            fullWidth
            {...lastName.input}
          />
          <TextField
            label="Password"
            margin="dense"
            variant="outlined"
            fullWidth
            helperText={password.meta.touched && password.meta.error}
            {...password.input}
            type="password"
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
            Create Account
          </Button>
          <Link route="\">
            <Button color="primary">Already have an account</Button>
          </Link>
        </CardActions>
      </Card>
    </form>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(connect(Signup));
