import PropTypes from 'prop-types';
import connect from './store';

const SearchEntities = ({ children, searchEntities, loading }) =>
  children(searchEntities, loading);

SearchEntities.defaultProps = {
  searchEntities: null,
  loading: false
};

SearchEntities.propTypes = {
  children: PropTypes.func.isRequired,
  searchEntities: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(SearchEntities);
