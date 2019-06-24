import React from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import _ from 'lodash';
import Default from '../Default';
import styles from './style';

class PlatformContainer extends React.Component {
  state = {
    value: 'default',
    usedTabs: [{ value: 'default', label: 'Default' }]
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onChange = newSubPlatformMessages => {
    const { messages, onChange } = this.props;
    const { value } = this.state;
    onChange(
      _.concat(
        newSubPlatformMessages,
        messages.filter(message => message.platform !== value)
      )
    );
  };

  render() {
    const { messages, classes } = this.props;
    const { value, usedTabs } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          {usedTabs.map(tab => (
            <Tab
              key={tab.value}
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
        <div className={classes.container}>
          <Scrollbar
            translateContentSizeYToHolder
            noScrollX
            style={{
              widt: '100%',
              maxHeight: 'calc(50vh - 85px)'
            }}
          >
            {value === 'default' && (
              <Default
                messages={messages.filter(
                  message => message.platform === 'default'
                )}
                onChange={this.onChange}
              />
            )}
          </Scrollbar>
        </div>
      </div>
    );
  }
}

PlatformContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(PlatformContainer);
