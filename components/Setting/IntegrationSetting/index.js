import React, { useState } from 'react';
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

const IntegrationSetting = props => {
  const { classes, myIntegrations, updateIntegration } = props;
  const [dialogflowDialogOpen, setDialogflowDialogOpen] = useState(false);
  const [defaultDialogOpen, setDefaultDialogOpen] = useState(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [myIntegration] = myIntegrations;
  const integrationList = [
    {
      vendor: 'Default',
      isConnected: myIntegration && myIntegration.vendor === 'Default',
      avatar: (
        <Avatar>
          <MemoryIcon />
        </Avatar>
      )
    },
    {
      vendor: 'Dialogflow',
      isConnected: myIntegration && myIntegration.vendor === 'Dialogflow',
      avatar: (
        <Avatar alt="Dialogflow Icon" src="/static/img/dialogflow-logo.png" />
      )
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
      setting: null
    }).then(() => {
      if (action === 'DISCONNECT') {
        setDisconnectDialogOpen(false);
      } else {
        setDefaultDialogOpen(false);
      }
    });
  };

  const onConnect = vendor => {
    if (vendor === 'Dialogflow') {
      setDialogflowDialogOpen(true);
    } else if (vendor === 'Default') {
      setDefaultDialogOpen(true);
    }
  };

  const onEdit = vendor => {
    if (vendor === 'Dialogflow') {
      setDialogflowDialogOpen(true);
    }
  };

  const onDisconnect = () => {
    setDisconnectDialogOpen(true);
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
              actionName="CONNECT"
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
                    secondary={
                      listItem.isConnected ? 'Connected' : 'Disconnected'
                    }
                  />
                  <ListItemSecondaryAction>
                    {listItem.isConnected ? (
                      listItem.vendor !== 'Default' && (
                        <React.Fragment>
                          <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            onClick={() => onEdit(listItem.vendor)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => onDisconnect()}
                          >
                            Disconnect
                          </Button>
                        </React.Fragment>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onConnect(listItem.vendor)}
                      >
                        Connect
                      </Button>
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

IntegrationSetting.defaultProps = {
  myIntegrations: []
};

IntegrationSetting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  updateIntegration: PropTypes.func.isRequired,
  myIntegrations: PropTypes.array
};

export default withStyles(style)(connect(IntegrationSetting));
