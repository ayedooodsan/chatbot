import PropTypes from 'prop-types';
import connect from './store';

const MyIntents = ({ children, myIntents, loading }) =>
  children(myIntents, loading);

MyIntents.defaultProps = {
  myIntents: null,
  loading: false
};

MyIntents.propTypes = {
  children: PropTypes.func.isRequired,
  myIntents: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(MyIntents);
