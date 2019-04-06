import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import { withStyles } from '@material-ui/core/styles';
import Button from 'material-dashboard-react/dist/components/CustomButtons/Button';
import Card from 'material-dashboard-react/dist/components/Card/Card';
import CardHeader from 'material-dashboard-react/dist/components/Card/CardHeader';
import CardBody from 'material-dashboard-react/dist/components/Card/CardBody';
import CardFooter from 'material-dashboard-react/dist/components/Card/CardFooter';
import CustomInput from '../CustomInput';
import redirect from '../../libraries/redirect';
import { isTypeOfString } from '../../libraries/helpers';
import { Link } from '../../routes';
import connect from './store';

const styles = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    marginBottom: '3px',
    textDecoration: 'none'
  }
};

const onSubmit = props => {
  return values => {
    props.mutations.signIn(values).then(response => {
      if (response.data.signIn.token) {
        props.actions.signIn(response.data.signIn.token);
        redirect({}, '/dialog');
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
        <CardHeader color="success">
          <h3 className={classes.cardTitleWhite}>SIGN IN</h3>
        </CardHeader>
        <CardBody>
          <CustomInput
            labelText="Username"
            helperText={login.meta.touched && login.meta.error}
            formControlProps={{
              fullWidth: true,
              error: login.meta.touched && isTypeOfString(login.meta.error)
            }}
            inputProps={login.input}
            error={login.meta.touched && isTypeOfString(login.meta.error)}
            success={login.meta.touched && !isTypeOfString(login.meta.error)}
          />
          <CustomInput
            labelText="Password"
            helperText={password.meta.touched && password.meta.error}
            id="password"
            formControlProps={{
              fullWidth: true,
              error:
                password.meta.touched && isTypeOfString(password.meta.error)
            }}
            inputProps={{ ...password.input, type: 'password' }}
            error={password.meta.touched && isTypeOfString(password.meta.error)}
            success={
              password.meta.touched && !isTypeOfString(password.meta.error)
            }
          />
        </CardBody>
        <CardFooter>
          <Button
            color="success"
            type="submit"
            disabled={prestine || submitting}
          >
            Sign in
          </Button>
          <Link route="/sign-up">
            <Button color="success" link>
              Sign up
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(Signin));
