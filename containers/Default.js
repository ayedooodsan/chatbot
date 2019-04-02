import PropTypes from 'prop-types';
import App from '../components/App';

const Default = props => <App>{props.children}</App>;

Default.propTypes = {
  title: PropTypes.string,
  url: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

Default.defaultProps = {
  title: ''
};

export default Default;
