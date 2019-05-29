import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Scrollbar from 'react-scrollbars-custom';

import style from './style';

class SubNavigation extends React.Component {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, header, body, noHeader } = this.props;
    const { open } = this.state;
    return (
      <Paper
        className={classNames(classes.root, {
          [classes.rootOpen]: open,
          [classes.rootClose]: !open
        })}
      >
        {open ? (
          <Fab
            color="primary"
            onClick={this.handleDrawerClose}
            aria-label="Add"
            className={classes.fab}
            size="small"
          >
            <ChevronLeftIcon />
          </Fab>
        ) : (
          <Fab
            color="primary"
            onClick={this.handleDrawerOpen}
            aria-label="Add"
            className={classes.fab}
            size="small"
          >
            <MenuIcon />
          </Fab>
        )}
        <div
          className={classNames(classes.container, {
            [classes.containerClose]: !open,
            [classes.noHeaderContainer]: noHeader
          })}
        >
          {!noHeader && (
            <div className={classes.containerHeader}>{header()}</div>
          )}
          <div className={classes.containerBody}>
            <Scrollbar contentProps={{ style: { width: '100%' } }}>
              <div className={classes.insideScrollbar}>{body()}</div>
            </Scrollbar>
          </div>
        </div>
      </Paper>
    );
  }
}

SubNavigation.defaultProps = {
  noHeader: false
};

SubNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.func.isRequired,
  body: PropTypes.func.isRequired,
  noHeader: PropTypes.bool
};

export default withStyles(style)(SubNavigation);
