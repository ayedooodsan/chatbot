import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import withData from '../libraries/withData';
import Dashboard from '../containers/Dashboard';
import IntentsMenu from '../components/IntentsMenu';
import IntentMenu from '../components/IntentMenu';
import IntentInfo from '../components/IntentInfo';

const style = () => ({
  dialogGrid: {
    paddingLeft: '0'
  }
});

const Intent = props => {
  const { classes, router } = props;
  const { intentId, projectId } = router.url.query;
  return (
    <Dashboard>
      <Grid container spacing={0}>
        <Grid item md={3}>
          <IntentsMenu projectId={projectId} intentId={intentId} />
        </Grid>
        <Grid item md={9} className={classes.dialogGrid}>
          {intentId === undefined ? (
            <IntentInfo />
          ) : (
            <IntentMenu intentId={intentId} projectId={projectId} />
          )}
        </Grid>
      </Grid>
    </Dashboard>
  );
};

Intent.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(withData(Intent));
