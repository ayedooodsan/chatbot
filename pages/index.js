import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import App from '../components/App';
import withData from '../libraries/withData';

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
    <App>
      <div>
        <h1>index</h1>
        <p>HELLO WORLD! HELLO FROM RAN!</p>
        <div>
          <Button variant="contained" className={classes.button}>
            Default
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Primary
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Secondary
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled
            className={classes.button}
          >
            Disabled
          </Button>
          <Button
            variant="contained"
            href="#contained-buttons"
            className={classes.button}
          >
            Link
          </Button>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
        </div>
        <hr />
      </div>
    </App>
  );
});

export default withStyles(styles)(index);
