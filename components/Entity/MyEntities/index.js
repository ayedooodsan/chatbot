import PropTypes from 'prop-types';
import connect from './store';

const MyEntities = ({ children, myEntities, loading }) =>
  children(myEntities, loading);

MyEntities.defaultProps = {
  myEntities: null,
  loading: false
};

MyEntities.propTypes = {
  children: PropTypes.func.isRequired,
  myEntities: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(MyEntities);
