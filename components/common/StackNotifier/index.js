import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import connect from './store';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  default: null
};

const styles = theme => ({
  default: {
    backgroundColor: 'rgb(0.49, 0.49, 0.49)'
  },
  success: {
    backgroundColor: '#43a047'
  },
  error: {
    backgroundColor: '#d32f2f'
  },
  info: {
    backgroundColor: '#2979ff'
  },
  warning: {
    backgroundColor: '#ffa000'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ConsecutiveSnackbars extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open) {
      // immediately begin dismissing current message
      // to start showing new one
      return {
        open: false
      };
    }
    if (nextProps.notifications.length > 0) {
      const newNotification = nextProps.notifications.shift();
      if (_.isEqual(prevState.notification, newNotification)) {
        return null;
      }
      return {
        notification: newNotification,
        open: true
      };
    }
    return null;
  }

  state = {
    open: false,
    notification: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open) {
      this.props.actions.shiftSnackbar();
    }
  }

  processQueue = () => {
    if (this.props.notifications.length > 0) {
      const newNotification = this.props.notifications.shift();
      this.setState({
        notification: newNotification,
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { classes, className } = this.props;
    const { notification } = this.state;
    const { message, options = {} } = notification;
    const { variant = 'default', ...otherOptions } = options;
    const Icon = variantIcon[variant];
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={this.state.open}
        onClose={this.handleClose}
        onExited={this.handleExited}
        {...otherOptions}
      >
        <SnackbarContent
          className={classNames(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

ConsecutiveSnackbars.defaultProps = {
  className: ''
};

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(connect(ConsecutiveSnackbars));
