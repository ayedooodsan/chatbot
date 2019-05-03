import { connect } from 'react-redux';
import { dispatchers } from '../../../redux/notifier';

const mapStateToProps = state => ({
  notifications: state.notifier.notifications
});

const mapDispatchToProps = dispatch => ({
  actions: {
    removeSnackbar(key) {
      dispatch(dispatchers.removeSnackbar(key));
    }
  }
});

export default comp => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(comp);
};
