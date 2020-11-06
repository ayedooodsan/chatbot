/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MemoryIcon from '@material-ui/icons/Memory';
import ActionConfirmDialog from '../../common/ActionConfirmDialog';
import UploadFileDialog from '../../common/UploadFileDialog';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import style from './style';
import connect from './store';

const NLPEngineSetting = props => {
  const { classes, myIntegrations, updateIntegration, actions } = props;
  const [dialogflowDialogOpen, setDialogflowDialogOpen] = useState(false);
  const [defaultDialogOpen, setDefaultDialogOpen] = useState(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [myIntegration] = myIntegrations;

  const getNLPStatus = () => {
    const NLPStatus = myIntegration ? myIntegration.status : false;
    actions.setNLPStatus(NLPStatus);
  };

  useEffect(() => {
    getNLPStatus();
  });

  const integrationList = [
    {
      vendor: 'Default',
      isConnected: myIntegration && myIntegration.vendor === 'Default',
      avatar: (
        <Avatar>
          <MemoryIcon />
        </Avatar>
      ),
      status: myIntegration ? myIntegration.status : false,
      setting: myIntegration && myIntegration.setting !== null
    },
    {
      vendor: 'Dialogflow',
      isConnected: myIntegration && myIntegration.vendor === 'Dialogflow',
      avatar: (
        <Avatar alt="Dialogflow Icon" src="/static/img/dialogflow-logo.png" />
      ),
      status: myIntegration ? myIntegration.status : false,
      setting: myIntegration && myIntegration.setting !== null
    }
  ];

  const setDialogflowIntegration = file => {
    const reader = new FileReader();
    reader.onload = event => {
      const setting = event.target.result;
      updateIntegration({
        id: myIntegration.id,
        vendor: 'Dialogflow',
        setting
      }).then(() => {
        setDialogflowDialogOpen(false);
      });
    };
    reader.readAsText(file);
  };

  const setDefaultIntegration = action => {
    updateIntegration({
      id: myIntegration.id,
      vendor: 'Default',
      status: true
    }).then(() => {
      if (action === 'DISCONNECT') {
        setDisconnectDialogOpen(false);
      } else {
        setDefaultDialogOpen(false);
      }
    });
  };

  const onTurnOn = vendor => {
    if (vendor === 'Dialogflow') {
      updateIntegration({
        id: myIntegration.id,
        vendor,
        status: true
      }).then(() => {});
    } else if (vendor === 'Default') {
      setDefaultDialogOpen(true);
    }
    actions.setNLPStatus(true);
  };

  const onEdit = vendor => {
    if (vendor === 'Dialogflow') {
      setDialogflowDialogOpen(true);
    }
  };

  const onTurnOff = vendor => {
    updateIntegration({
      id: myIntegration.id,
      vendor: 'Default',
      status: false
    }).then(() => {});
    actions.setNLPStatus(false);
  };

  const buttonEnv = listItem => {
    return (
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => onEdit(listItem.vendor)}
        style={{ marginRight: 20 }}
      >
        {!listItem.setting ? 'Setup ENV' : 'Change ENV'}
      </Button>
    );
  };

  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="NLP Engine" noButton />}
      product={() => (
        <SimpleProductBody>
          <Paper className={classes.root}>
            <UploadFileDialog
              acceptType=".json"
              open={dialogflowDialogOpen}
              handleClose={() => setDialogflowDialogOpen(false)}
              handleConfirm={setDialogflowIntegration}
              placeholder="Type CONNECT and click the connect button"
              message="Upload Google Cloud Platform Service Account key"
              subMessage={() => (
                <span>
                  You can upload a Google Cloud Platform Service Account key as
                  JSON. Set Service Account role as Dialogflow API Admin.{' '}
                  <a
                    href="https://dialogflow.com/docs/reference/v2-auth-setup"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Learn more
                  </a>{' '}
                  about Google Cloud Platform Service Account.
                </span>
              )}
              actionName="SAVE"
            />
            <ActionConfirmDialog
              open={disconnectDialogOpen}
              handleClose={() => setDisconnectDialogOpen(false)}
              handleConfirm={() => setDefaultIntegration('DISCONNECT')}
              placeholder="Type DISCONNECT and click the disconnect button"
              message="Disconnect from Dialogflow"
              subMessage="Disconnect from Dialogflow and return to default setting."
              actionName="DISCONNECT"
            />
            <ActionConfirmDialog
              open={defaultDialogOpen}
              handleClose={() => setDefaultDialogOpen(false)}
              handleConfirm={() => setDefaultIntegration('CONNECT')}
              placeholder="Type CONNECT and click the connect button"
              message="Connect to Default Setting"
              subMessage="Connect to our Natural Language Processing."
              actionName="CONNECT"
            />
            <List>
              {integrationList.map(listItem => (
                <ListItem key={listItem.vendor}>
                  <ListItemAvatar>{listItem.avatar}</ListItemAvatar>
                  <ListItemText
                    primary={listItem.vendor}
                    secondary={listItem.isConnected ? 'On' : 'Off'}
                  />
                  <ListItemSecondaryAction>
                    {listItem.isConnected ? (
                      listItem.vendor !== 'Default' && (
                        <React.Fragment>
                          {buttonEnv(listItem)}
                          <Button
                            variant="contained"
                            onClick={() => onTurnOff(listItem.vendor)}
                            disabled={!listItem.setting}
                          >
                            Turn Off
                          </Button>
                        </React.Fragment>
                      )
                    ) : (
                      <React.Fragment>
                        {listItem.vendor !== 'Default' && buttonEnv(listItem)}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onTurnOn(listItem.vendor)}
                          disabled={!listItem.setting}
                        >
                          Turn On
                        </Button>
                      </React.Fragment>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </SimpleProductBody>
      )}
    />
  );
};

NLPEngineSetting.defaultProps = {
  myIntegrations: []
};

NLPEngineSetting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  updateIntegration: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  myIntegrations: PropTypes.array
};

export default withStyles(style)(connect(NLPEngineSetting));
