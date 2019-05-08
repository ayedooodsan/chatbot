import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'next/router';
import Project from '../../Project';
import style from './style';
import routes from './routes';
import { Link } from '../../../routes';

class Navigation extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, router } = this.props;
    const { projectId } = router.query;
    const activeRoute = route => {
      return router.route === route;
    };
    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })
        }}
        open={this.state.open}
      >
        <div className={classes.toolbar}>
          {this.state.open ? (
            <IconButton
              onClick={this.handleDrawerClose}
              className={classes.button}
            >
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={this.handleDrawerOpen}
              className={classes.button}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <Project projectId={projectId} collapse={this.state.open} />
        <List>
          {routes.map(route => (
            <Link route={`/${projectId}${route.route}`} key={route.name}>
              {!this.state.open ? (
                <Tooltip
                  title={route.name}
                  classes={{
                    tooltip: classes.lightTooltip,
                    popper: classes.lightPopper
                  }}
                  placement="right"
                >
                  <ListItem
                    button
                    className={classNames({
                      [classes.listItemActive]: activeRoute(route.route)
                    })}
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={route.name}
                      primaryTypographyProps={{
                        className: classNames(classes.listItemText, {
                          [classes.listItemTextClose]: !this.state.open
                        })
                      }}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <ListItem
                  button
                  className={classNames({
                    [classes.listItemActive]: activeRoute(route.route)
                  })}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    primaryTypographyProps={{
                      className: classNames(classes.listItemText, {
                        [classes.listItemTextClose]: !this.state.open
                      })
                    }}
                  />
                </ListItem>
              )}
            </Link>
          ))}
        </List>
      </Drawer>
    );
  }
}

Navigation.defaultProps = {
  router: {}
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object
};

export default withStyles(style)(withRouter(Navigation));
