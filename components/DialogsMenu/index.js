import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import DialogsBar from '../DialogsBar';
import style from './style';

class DialogsMenu extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      dialogs: [
        { id: 1, title: 'Introduction' },
        { id: 2, title: 'FAQ product' }
      ],
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
          <DialogsBar
            setKeyword={this.setKeyword}
            pagination={{ ...pagination, dataLength: dialogs.length }}
          />
        </Paper>
        <div className={classes.container}>
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
        </div>
      </Paper>
    );
  }
}

DialogsMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(DialogsMenu);
