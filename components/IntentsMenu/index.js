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

class IntentsMenu extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      dialogs: [{ id: 1, title: 'Say name' }, { id: 2, title: 'Say hai' }],
      pagination: {
        limit: 10,
        offset: 3
      },
      keyword: ''
    };
  }

  handleClickPagination = offset => {
    this.setState(offset);
  };

  setKeyword = keyword => {
    this.setState({ keyword });
  };

  render() {
    const { classes } = this.props;
    const { dialogs, pagination, keyword } = this.state;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <IntentsBar
            setKeyword={this.setKeyword}
            pagination={{ ...pagination, dataLength: dialogs.length }}
          />
        </Paper>
        <div className={classes.container}>
          <Scrollbar>
            <MenuList>
              {dialogs.map(dialog => (
                <MenuItem
                  key={dialog.id}
                  className={`${classes.menuItem} ${classes.whiteText}`}
                >
                  <Typography
                    variant="caption"
                    className={`${classes.menuTitle} ${classes.whiteText}`}
                  >
                    {dialog.title} {keyword}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </Scrollbar>
        </div>
      </Paper>
    );
  }
}

IntentsMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(IntentsMenu);
