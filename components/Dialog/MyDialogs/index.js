import PropTypes from 'prop-types';
import connect from './store';

const MyDialogs = ({ children, myDialogs, loading }) =>
  children(myDialogs, loading);

MyDialogs.defaultProps = {
  myDialogs: null,
  loading: false
};

MyDialogs.propTypes = {
  children: PropTypes.func.isRequired,
  myDialogs: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(MyDialogs);
