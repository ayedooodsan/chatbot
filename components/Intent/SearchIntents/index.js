import PropTypes from 'prop-types';
import connect from './store';

const SearchIntents = ({ children, searchIntents, loading }) =>
  children(searchIntents, loading);

SearchIntents.defaultProps = {
  searchIntents: null,
  loading: false
};

SearchIntents.propTypes = {
  children: PropTypes.func.isRequired,
  searchIntents: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(SearchIntents);
