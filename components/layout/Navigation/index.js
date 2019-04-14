import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withRouter } from 'next/router';
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
        <List>
          {routes.map(route => (
            <Link route={`/${projectId}${route.route}`}>
              <ListItem
                button
                key={route.name}
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
                    className: classNames(classes.listItemIcon, {
                      [classes.listItemTextClose]: !this.state.open
                    })
                  }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className={classes.listItemIcon}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  className: classNames(classes.listItemIcon, {
                    [classes.listItemTextClose]: !this.state.open
                  })
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(Navigation));
