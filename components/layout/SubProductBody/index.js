import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

const SubProductBody = props => {
  const { classes } = props;
  return <Paper className={classes.root}>Cek</Paper>;
};

SubProductBody.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(SubProductBody);
