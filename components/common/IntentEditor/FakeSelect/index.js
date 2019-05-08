import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const FakeSelect = props => {
  const { classes, children } = props;
  return <span className={classes.select}>{children}</span>;
};

FakeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired
};

export default withStyles(style)(FakeSelect);
