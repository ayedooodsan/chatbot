import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import DialogsBar from '../DialogsBar';
import style from './style';
import connect from './store';

class DialogsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        limit: 10,
        offset: 3
      }
    };
  }

  handleClickPagination = offset => {
    this.setState(offset);
  };

  setKeyword = keyword => {
    this.setState({ keyword });
  };

  render() {
    const { classes, myDialogs, projectId, dialogId } = this.props;
    const { pagination, keyword } = this.state;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <DialogsBar
            projectId={projectId}
            dialogId={dialogId}
            setKeyword={this.setKeyword}
            pagination={{ ...pagination, dataLength: myDialogs.length }}
          />
        </Paper>
        <div className={classes.container}>
          <Scrollbar>
            <MenuList>
              {myDialogs.map(dialog => (
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

DialogsMenu.defaultProps = {
  myDialogs: [],
  dialogId: null
};

DialogsMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  dialogId: PropTypes.string,
  myDialogs: PropTypes.array
};

export default withStyles(style)(connect(DialogsMenu));
