import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import style from './style';
import connect from './store';
import SimpleAutoComplete from '../ShareSetting/SimpleAutoComplete';
import UserSuggestions from '../../common/UserSuggestions';

const ResetPassword = props => {
  const { classes, resetPasswordUser } = props;
  const [newPassword, setNewPassword] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

  const onChangeUsername = values => {
    setSelectedUsername(values);
  };

  const onChangeNewPassword = event => {
    const password = event.target.value;
    setNewPassword(password);
  };

  const onResetPassword = () => {
    const payload = {
      password: newPassword
    };

    resetPasswordUser({
      username: selectedUsername.username,
      ...payload
    }).then(() => {});
  };

  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Reset Password" noButton />}
      product={() => (
        <SimpleProductBody>
          <div style={{ padding: '0 5px' }}>
            <Grid container>
              <Grid item xs={12} className={classes.grid}>
                <Paper className={classes.verticalContainer} elevation={1}>
                  <SimpleAutoComplete
                    className={classes.noMarginTop}
                    onChange={onChangeUsername}
                    placeholder="Username"
                    initialInputValue={selectedUsername.username || ''}
                    initialValue={selectedUsername.username || ''}
                    suggestions={(inputValue, children) => {
                      return (
                        <UserSuggestions keyword={inputValue}>
                          {children}
                        </UserSuggestions>
                      );
                    }}
                  />
                </Paper>
                <Paper className={classes.verticalContainer} elevation={1}>
                  <FormControl fullWidth>
                    <InputBase
                      className={classes.input}
                      placeholder="New Password"
                      onChange={onChangeNewPassword}
                      value={newPassword}
                    />
                  </FormControl>
                </Paper>
                <Grid
                  container
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => onResetPassword()}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </SimpleProductBody>
      )}
    />
  );
};

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  resetPasswordUser: PropTypes.func.isRequired
};

export default withStyles(style)(connect(ResetPassword));
