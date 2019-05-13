import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import { downloadZIP } from '../../../libraries/download';
import style from './style';
import connect from './store';

const BackupSetting = props => {
  const { classes, exportProject, projectId } = props;
  const [backupFile, setBackupFile] = useState(null);

  console.log(backupFile);

  const onDownload = () => {
    exportProject({ id: projectId }).then(response => {
      const { filename, stream } = response.data.exportProject;
      downloadZIP({ fileName: filename, zip: stream });
    });
  };

  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Backup and Restore" noButton />}
      product={() => (
        <SimpleProductBody>
          <div style={{ padding: '0 5px' }}>
            <Grid container spacing={16} justify="center">
              <Grid item xs="5" className={classes.grid}>
                <Paper className={classes.verticalContainer} elevation={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    Export
                  </Typography>
                  <Typography variant="body2" gutterBottom align="center">
                    Create a backup by downloading all entities, intents and
                    dialogs.
                  </Typography>
                  <Button
                    onClick={onDownload}
                    variant="outlined"
                    className={classes.button}
                  >
                    Download
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs="5" className={classes.grid}>
                <Paper className={classes.verticalContainer} elevation={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    Import
                  </Typography>
                  <Typography variant="body2" gutterBottom align="center">
                    Upload new intents, entities and dialogs without deleting
                    the current the current ones. Intents, entities and dialogs
                    with the same name will be replaced with the newer version.
                  </Typography>
                  <label htmlFor="uploadFile">
                    <input
                      accept=".xlsx"
                      className={classes.input}
                      style={{ display: 'none' }}
                      id="uploadFile"
                      multiple
                      type="file"
                      onChange={({
                        target: {
                          validity,
                          files: [file]
                        }
                      }) => validity.valid && setBackupFile(file)}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      className={classes.button}
                    >
                      Upload
                    </Button>
                  </label>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </SimpleProductBody>
      )}
    />
  );
};

BackupSetting.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  exportProject: PropTypes.func.isRequired
};

export default withStyles(style)(connect(BackupSetting));
