import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const LayoutProvider = ({ navigation, subNavigation, children, classes }) => (
  <div className={classes.root}>
    {navigation()}
    {subNavigation && subNavigation()}
    <div className={classes.children}>{children}</div>
  </div>
);

LayoutProvider.defaultProps = {
  subNavigation: null
};

LayoutProvider.propTypes = {
  navigation: PropTypes.func.isRequired,
  subNavigation: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(LayoutProvider);
