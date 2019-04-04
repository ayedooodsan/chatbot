import React from 'react';
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

const Signin = props => {
  const { classes } = props;
  return (
    <Card>
      <CardHeader color="primary">
        <h3 className={classes.cardTitleWhite}>SIGN IN</h3>
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
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            type: 'password'
          }}
        />
      </CardBody>
      <CardFooter>
        <Button color="primary">Sign in</Button>
        <Link route="/sign-up">
          <Button color="primary" link>
            Sign up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
