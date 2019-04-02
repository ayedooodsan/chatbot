import * as React from 'react';
import PropTypes from 'prop-types';

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

  return <div>{children}</div>;
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
