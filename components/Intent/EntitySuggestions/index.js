import PropTypes from 'prop-types';
import connect from './store';

const EntitySuggestions = ({ children, entitySuggestions, loading }) =>
  children(entitySuggestions, loading);

EntitySuggestions.defaultProps = {
  entitySuggestions: [],
  loading: false
};

EntitySuggestions.propTypes = {
  children: PropTypes.func.isRequired,
  entitySuggestions: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(EntitySuggestions);
