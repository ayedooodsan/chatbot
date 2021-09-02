import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import _ from 'lodash';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import style from './style';
import connect from './store';

const QisqusIntegration = props => {
  const { classes, saveQisqusIntegration, projectId, myIntegrations } = props;

  const formField = {
    dialogflowProjectId: '',
    qiscusAccountEmail: '',
    qiscusAccountPassword: '',
    qiscusAppId: '',
    secretKeyBot: '',
    senderEmail: ''
  };

  const [formValue, setFormValue] = useState(formField);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeForm = (target, value) => {
    setFormValue(prevState => ({ ...prevState, [target]: value }));
  };

  const onSubmitForm = () => {
    const payload = {
      ...formValue,
      projectId
    };
    saveQisqusIntegration({
      ...payload
    }).then(() => {});
  };

  const handleClickShowPassword = () => {
    setShowPassword(prevState => {
      return !prevState;
    });
  };

  useEffect(() => {
    if (!_.isEmpty(myIntegrations)) {
      const [myIntegration] = myIntegrations;
      const qisqusDetail = {
        dialogflowProjectId: myIntegration.dialogflowProjectId || '',
        qiscusAccountEmail: myIntegration.qiscusAccountEmail || '',
        qiscusAccountPassword: myIntegration.qiscusAccountPassword || '',
        qiscusAppId: myIntegration.qiscusAppId || '',
        secretKeyBot: myIntegration.secretKeyBot || '',
        senderEmail: myIntegration.senderEmail || ''
      };
      setFormValue(qisqusDetail);
    }
  }, [myIntegrations]);

  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Qisqus Integration" noButton />}
      product={() => (
        <SimpleProductBody>
          <div style={{ padding: '0 5px' }}>
            <Grid container>
              <Grid item xs={12} className={classes.grid}>
                <Paper className={classes.verticalContainer} elevation={1}>
                  <Grid container style={{ flexDirection: 'column' }}>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          value={formValue.dialogflowProjectId}
                          onChange={event =>
                            handleChangeForm(
                              'dialogflowProjectId',
                              event.target.value
                            )
                          }
                          placeholder="Googleflow ID"
                          margin="dense"
                          label="Googleflow ID"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          value={formValue.qiscusAccountEmail}
                          onChange={event =>
                            handleChangeForm(
                              'qiscusAccountEmail',
                              event.target.value
                            )
                          }
                          placeholder="Qiscus Account Email"
                          margin="dense"
                          label="Qiscus Account Email"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          value={formValue.qiscusAccountPassword}
                          onChange={event =>
                            handleChangeForm(
                              'qiscusAccountPassword',
                              event.target.value
                            )
                          }
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Qiscus Account Password"
                          margin="dense"
                          label="Qiscus Account Password"
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          value={formValue.qiscusAppId}
                          onChange={event =>
                            handleChangeForm('qiscusAppId', event.target.value)
                          }
                          placeholder="Qiscus App Id"
                          margin="dense"
                          label="Qiscus App Id"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          value={formValue.secretKeyBot}
                          onChange={event =>
                            handleChangeForm('secretKeyBot', event.target.value)
                          }
                          placeholder="Secret Key Bot"
                          margin="dense"
                          label="Secret Key Bot"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          value={formValue.senderEmail}
                          onChange={event =>
                            handleChangeForm('senderEmail', event.target.value)
                          }
                          placeholder="Sender Email"
                          margin="dense"
                          label="Sender Email"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
                <Grid
                  container
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => onSubmitForm()}
                    disabled={_.some(formValue, _.isEmpty)}
                  >
                    Save
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

QisqusIntegration.defaultProps = {
  myIntegrations: []
};

QisqusIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  saveQisqusIntegration: PropTypes.func.isRequired,
  myIntegrations: PropTypes.array
};

export default withStyles(style)(connect(QisqusIntegration));
