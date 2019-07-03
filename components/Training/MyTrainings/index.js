import PropTypes from 'prop-types';
import connect from './store';

const MyTrainings = ({ children, myTrainings, loading }) =>
  children(myTrainings, loading);

MyTrainings.defaultProps = {
  myTrainings: null,
  loading: false
};

MyTrainings.propTypes = {
  children: PropTypes.func.isRequired,
  myTrainings: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(MyTrainings);
