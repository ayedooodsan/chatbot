import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import withData from '../libraries/withData';
import Dashboard from '../containers/Dashboard';
import IntentsMenu from '../components/IntentsMenu';
import IntentMenu from '../components/IntentMenu';

const style = () => ({
  dialogGrid: {
    paddingLeft: '0'
  }
});

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.dialogList = React.createRef();
  }

  render() {
    const { classes } = this.props;
    return (
      <Dashboard>
        <Grid container spacing={0}>
          <Grid item md={3}>
            <IntentsMenu />
          </Grid>
          <Grid item md={9} className={classes.dialogGrid}>
            <IntentMenu />
          </Grid>
        </Grid>
      </Dashboard>
    );
  }
}

Dialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(withData(Dialog));
