import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Default from '../containers/Default';
import withData from '../libraries/withData';
import Signin from '../components/Signin';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const index = withData(props => {
  const { classes } = props;
  return (
    <Default>
      <Button variant="contained" className={classes.button}>
        Default
      </Button>
      <Signin />
    </Default>
  );
});

export default withStyles(styles)(index);
