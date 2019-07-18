import * as React from 'react';
import PropTypes from 'prop-types';
import StackNotifier from './common/StackNotifier';

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
    <React.Fragment>
      <StackNotifier />
      {children}
    </React.Fragment>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
