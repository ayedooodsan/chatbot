import PropTypes from 'prop-types';
import connect from './store';

const UserSuggestions = ({ children, userSuggestions, loading }) =>
  children(userSuggestions, loading);

UserSuggestions.defaultProps = {
  userSuggestions: [],
  loading: false
};

UserSuggestions.propTypes = {
  children: PropTypes.func.isRequired,
  userSuggestions: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(UserSuggestions);
