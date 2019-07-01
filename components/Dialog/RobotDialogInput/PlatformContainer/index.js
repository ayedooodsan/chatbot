import React from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import platformOptions from '../const';
import Default from '../Default';
import Zoho from '../Zoho';
import styles from './style';

class PlatformContainer extends React.Component {
  constructor(props) {
    super(props);
    const { messages, activePlatform } = props;
    const {
      usedTabs: newUsedTabs,
      unusedTabs: newUnusedTabs
    } = messages.reduce(
      ({ usedTabs, unusedTabs }, message) => {
        const { platform } = message;
        const unusedTabIndex = unusedTabs.findIndex(
          unusedTab => unusedTab.value === platform
        );
        if (unusedTabIndex !== -1) {
          const [newUsedTab] = _.pullAt(unusedTabs, [unusedTabIndex]);
          usedTabs.push(newUsedTab);
        }
        return {
          usedTabs,
          unusedTabs
        };
      },
      {
        usedTabs: [{ value: 'default', label: 'Default' }],
        unusedTabs: [...platformOptions]
      }
    );
    this.state = {
      newPlatformEl: null,
      value: activePlatform,
      usedTabs: newUsedTabs,
      unusedTabs: newUnusedTabs
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onChange = newSubPlatformMessages => {
    const { messages, onMessagesChange } = this.props;
    const { value } = this.state;
    onMessagesChange(
      _.concat(
        newSubPlatformMessages,
        messages.filter(message => message.platform !== value)
      )
    );
  };

  openNewPlatform = event => {
    this.setState({ newPlatformEl: event.currentTarget });
  };

  closeNewPlatform = () => {
    this.setState({ newPlatformEl: null });
  };

  addPlatform = tabValue => {
    this.setState({ newPlatformEl: null }, () => {
      this.setState(prevState => {
        const {
          usedTabs: prevUsedTabs,
          unusedTabs: prevUnusedTabs
        } = prevState;
        const newUsedTabs = _.remove(
          prevUnusedTabs,
          prevUnusedTab => prevUnusedTab.value === tabValue
        );
        return {
          usedTabs: _.concat(prevUsedTabs, newUsedTabs),
          unusedTabs: [...prevUnusedTabs],
          value: tabValue,
          newPlatformEl: null
        };
      });
    });
  };

  render() {
    const { messages, classes, title, onTitleChange } = this.props;
    const { value, usedTabs, unusedTabs, newPlatformEl } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              className={classes.textField}
              autoFocus
              value={title}
              onChange={event => onTitleChange(event.target.value)}
              label="Title"
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabsIndicator
              }}
            >
              {usedTabs.map(tab => (
                <Tab
                  key={tab.value}
                  disableRipple
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabSelected
                  }}
                  value={tab.value}
                  label={tab.label}
                />
              ))}
              {unusedTabs.length > 0 && (
                <div className={classes.addContainer}>
                  <IconButton
                    color="primary"
                    variant="outlined"
                    size="medium"
                    aria-owns={newPlatformEl ? 'platforms' : undefined}
                    aria-haspopup="true"
                    onClick={this.openNewPlatform}
                  >
                    <Add />
                  </IconButton>
                  <Menu
                    id="platforms"
                    anchorEl={newPlatformEl}
                    open={Boolean(newPlatformEl)}
                    onClose={this.closeNewPlatform}
                  >
                    {unusedTabs.map(unusedTab => (
                      <MenuItem
                        key={unusedTab.value}
                        onClick={() => this.addPlatform(unusedTab.value)}
                      >
                        {unusedTab.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              )}
            </Tabs>
          </Grid>
        </Grid>
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
            {value === 'zoho' && (
              <Zoho
                messages={messages.filter(
                  message => message.platform === 'zoho'
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

PlatformContainer.defaultProps = {
  activePlatform: 'default'
};

PlatformContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  onMessagesChange: PropTypes.func.isRequired,
  activePlatform: PropTypes.string
};

export default withStyles(styles)(PlatformContainer);
