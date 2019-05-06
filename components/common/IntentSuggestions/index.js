import PropTypes from 'prop-types';
import connect from './store';

const IntentSuggestions = ({ children, intentSuggestions, loading }) =>
  children(intentSuggestions, loading);

IntentSuggestions.defaultProps = {
  intentSuggestions: [],
  loading: false
};

IntentSuggestions.propTypes = {
  children: PropTypes.func.isRequired,
  intentSuggestions: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(IntentSuggestions);
