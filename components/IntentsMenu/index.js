import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import IntentsBar from '../IntentsBar';
import style from './style';
import connect from './store';
import { Link } from '../../routes';

class IntentsMenu extends Component {
  state = {
    pagination: {
      limit: 10,
      offset: 3
    },
    keyword: ''
  };

  handleClickPagination = offset => {
    this.setState(offset);
  };

  setKeyword = keyword => {
    this.setState({ keyword });
  };

  render() {
    const { classes, myIntents, projectId, intentId } = this.props;
    const { pagination, keyword } = this.state;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <IntentsBar
            projectId={projectId}
            setKeyword={this.setKeyword}
            pagination={{ ...pagination, dataLength: myIntents.length }}
          />
        </Paper>
        <div className={classes.container}>
          <Scrollbar>
            {myIntents && (
              <MenuList>
                {myIntents.map(myIntent => (
                  <Link
                    route={`/${projectId}/intent/${myIntent.id}`}
                    key={myIntent.id}
                  >
                    <MenuItem
                      className={`${classes.menuItem} ${classes.whiteText} ${
                        myIntent.id === intentId ? classes.activeMenuItem : ''
                      }`}
                    >
                      <Typography
                        variant="caption"
                        className={`${classes.menuTitle} ${classes.whiteText}`}
                      >
                        {myIntent.title} {keyword}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            )}
          </Scrollbar>
        </div>
      </Paper>
    );
  }
}

IntentsMenu.defaultProps = {
  myIntents: []
};

IntentsMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  intentId: PropTypes.string.isRequired,
  myIntents: PropTypes.array
};

export default withStyles(style)(connect(IntentsMenu));
