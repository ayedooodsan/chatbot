import PropTypes from 'prop-types';
import connect from './store';

const MyEntites = ({ children, myEntities, loading }) =>
  children(myEntities, loading);

MyEntites.defaultProps = {
  myEntities: null,
  loading: false
};

MyEntites.propTypes = {
  children: PropTypes.func.isRequired,
  myEntities: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(MyEntites);
