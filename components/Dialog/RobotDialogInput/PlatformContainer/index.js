import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import _ from 'lodash';
import Default from '../Default';
import styles from './style';

// const tabs = [{ value: 'default', label: 'Default' }];

class PlatformContainer extends React.Component {
  state = {
    value: 0,
    usedTabs: [{ value: 'default', label: 'Default' }],
    platformMessages: {}
  };

  static getDerivedStateFromProps(props, state) {
    const newPlatformMessages = _.groupBy(
      props.messages,
      message => message.platform
    );
    if (_.isEqual(newPlatformMessages, state.platformMessages)) {
      return null;
    }
    return {
      platformMessages: _.groupBy(props.messages, message => message.platform)
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { platformMessages, value, usedTabs } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          {usedTabs.map(tab => (
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
        {value === 'default' && <Default messages={platformMessages.default} />}
      </div>
    );
  }
}

PlatformContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlatformContainer);
