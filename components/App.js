import * as React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import Notifier from './common/Notifier';

let offlineInstalled = false;

const App = ({ children }) => {
  if (process.env.OFFLINE_SUPPORT && process.browser && !offlineInstalled) {
    const OfflinePlugin = require('offline-plugin/runtime'); // eslint-disable-line global-require

    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate();
      },
      onUpdated() {
        window.location.reload();
      }
    });
    offlineInstalled = true;
  }

  return (
    <SnackbarProvider
      preventDuplicate
      hideIconVariant
      maxSnack={10}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <Notifier />
      {children}
    </SnackbarProvider>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
