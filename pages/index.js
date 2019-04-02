import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Default from '../containers/Default';
import withData from '../libraries/withData';
import Signin from '../components/Signin';

const style = theme => ({
  root: {
    marginTop: theme.spacing.unit * 20
  }
});

const index = withData(props => {
  const { classes } = props;
  return (
    <Default>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Signin />
      </Grid>
    </Default>
  );
});

export default withStyles(style)(index);
