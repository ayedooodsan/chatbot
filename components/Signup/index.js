import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CustomInput from 'material-dashboard-react/dist/components/CustomInput/CustomInput';
import Button from 'material-dashboard-react/dist/components/CustomButtons/Button';
import Card from 'material-dashboard-react/dist/components/Card/Card';
import CardHeader from 'material-dashboard-react/dist/components/Card/CardHeader';
import CardBody from 'material-dashboard-react/dist/components/Card/CardBody';
import CardFooter from 'material-dashboard-react/dist/components/Card/CardFooter';

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
const Signup = props => {
  const { classes } = props;
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Create Account</h4>
        <p className={classes.cardCategoryWhite}>Complete your account</p>
      </CardHeader>
      <CardBody>
        <CustomInput
          labelText="Username"
          id="username"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="Email address"
          id="email-address"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="First Name"
          id="first-name"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="Last Name"
          id="last-name"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="Confirm Password"
          id="confirm-password"
          formControlProps={{
            fullWidth: true
          }}
        />
      </CardBody>
      <CardFooter>
        <Button color="primary">Create Account</Button>
        <Link route="\">
          <Button color="primary" link>
            Already have an account
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
