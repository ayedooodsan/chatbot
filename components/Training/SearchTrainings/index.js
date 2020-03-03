import PropTypes from 'prop-types';
import connect from './store';

const SearchTrainings = ({ children, searchTrainings, loading }) =>
  children(searchTrainings, loading);

SearchTrainings.defaultProps = {
  searchTrainings: null,
  loading: false
};

SearchTrainings.propTypes = {
  children: PropTypes.func.isRequired,
  searchTrainings: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(SearchTrainings);
