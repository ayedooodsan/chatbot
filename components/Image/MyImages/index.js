import PropTypes from 'prop-types';
import connect from './store';

const MyImages = ({ children, myImages, loading }) =>
  children(myImages, loading);

MyImages.defaultProps = {
  myImages: null,
  loading: false
};

MyImages.propTypes = {
  children: PropTypes.func.isRequired,
  myImages: PropTypes.object,
  loading: PropTypes.bool
};

export default connect(MyImages);
