import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
import AdminNavbarLinks from '../HeaderLinks';

import style from './style';
import routes, { Link } from '../../routes';
import sideBarRoutes from './routes';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  const { router, route, params } = props;
  function activeRoute() {
    return route === null
      ? false
      : routes.findAndGetUrls(route, params).urls.as === router.asPath;
  }
  const { classes, color, logo, image, logoText } = props;
  const links = (
    <List className={classes.list}>
      {sideBarRoutes.map(prop => {
        const listItemClasses = classNames({
          [`${classes[color]}`]: activeRoute()
        });
        const whiteFontClasses = classNames({
          [`${classes.whiteFont}`]: activeRoute()
        });
        return (
          <Link
            route={prop.route}
            className={classes.item}
            activeClassName="active"
            key={prop.route}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === 'string' ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: false
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: false
                  })}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: false
                })}
                disableTypography
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: false
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: false
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: false
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.defaultProps = {
  route: null,
  params: null
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  logoText: PropTypes.string.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.string,
  params: PropTypes.object
};

export default withStyles(style)(withRouter(Sidebar));
