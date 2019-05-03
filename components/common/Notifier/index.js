import { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import connect from './store';

class Notifier extends Component {
  displayed = [];

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (!notExists) {
        notExists =
          notExists ||
          !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
      }
    }
    return notExists;
  }

  componentDidUpdate() {
    const {
      notifications = [],
      enqueueSnackbar,
      actions: { removeSnackbar }
    } = this.props;

    notifications.forEach(notification => {
      if (this.displayed.includes(notification.key)) return;
      enqueueSnackbar(notification.message, notification.options);
      this.storeDisplayed(notification.key);
      removeSnackbar(notification.key);
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
  actions: PropTypes.object.isRequired
};

export default connect(withSnackbar(Notifier));
