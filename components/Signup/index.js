import React from 'react';
import { useForm, useField } from 'react-final-form-hooks';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-dashboard-react/dist/components/CustomButtons/Button';
import Card from 'material-dashboard-react/dist/components/Card/Card';
import CardHeader from 'material-dashboard-react/dist/components/Card/CardHeader';
import CardBody from 'material-dashboard-react/dist/components/Card/CardBody';
import CardFooter from 'material-dashboard-react/dist/components/Card/CardFooter';
import CustomInput from '../CustomInput';

import { Link } from '../../routes';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
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

const onSubmit = values => {
  console.log(values);
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
    errors.password = 'Password must longer than six character';
  }
  return errors;
};

const isTypeOfString = value => typeof value === 'string';

const Signup = props => {
  const { form, handleSubmit, prestine, submitting } = useForm({
    onSubmit,
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
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Create Account</h4>
          <p className={classes.cardCategoryWhite}>Complete your account</p>
        </CardHeader>
        <CardBody>
          <CustomInput
            labelText="Username"
            helperText={username.meta.touched && username.meta.error}
            formControlProps={{
              fullWidth: true,
              error:
                username.meta.touched && isTypeOfString(username.meta.error)
            }}
            inputProps={username.input}
            error={username.meta.touched && isTypeOfString(username.meta.error)}
            success={
              username.meta.touched && !isTypeOfString(username.meta.error)
            }
          />
          <CustomInput
            labelText="Email address"
            helperText={email.meta.touched && email.meta.error}
            id="email-address"
            formControlProps={{
              fullWidth: true,
              error: email.meta.touched && isTypeOfString(email.meta.error)
            }}
            inputProps={email.input}
            error={email.meta.touched && isTypeOfString(email.meta.error)}
            success={email.meta.touched && !isTypeOfString(email.meta.error)}
          />
          <CustomInput
            labelText="First Name"
            helperText={firstName.meta.touched && firstName.meta.error}
            id="first-name"
            formControlProps={{
              fullWidth: true,
              error:
                firstName.meta.touched && isTypeOfString(firstName.meta.error)
            }}
            inputProps={firstName.input}
            error={
              firstName.meta.touched && isTypeOfString(firstName.meta.error)
            }
            success={
              firstName.meta.touched && !isTypeOfString(firstName.meta.error)
            }
          />
          <CustomInput
            labelText="Last Name"
            id="last-name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={lastName.input}
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
            color="primary"
            type="submit"
            disabled={prestine || submitting}
          >
            Create Account
          </Button>
          <Link route="\">
            <Button color="primary" link>
              Already have an account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
