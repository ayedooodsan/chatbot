import { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import connect from './store';

class Notifier extends Component {
  displayed = [];

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    if (!newSnacks.length) {
      this.displayed = [];
      return false;
    }

    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      const newSnack = newSnacks[i];
      if (newSnack.dismissed) {
        this.props.closeSnackbar(newSnack.key);
        this.props.actions.removeSnackbar(newSnack.key);
      }

      // eslint-disable-next-line no-continue
      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnack.key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(({ key, message, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, currentKey) => {
          if (options.onClose) {
            options.onClose(event, reason, currentKey);
          }
          // Dispatch action to remove snackbar from redux store
          this.props.actions.removeSnackbar(key);
        }
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  render() {
    return null;
  }
}

Notifier.propTypes = {
  notifications: PropTypes.array.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(withSnackbar(Notifier));
