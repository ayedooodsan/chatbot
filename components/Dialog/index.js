import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import SubNavigation from '../layout/SubNavigation';
import SimpleHeader from '../layout/SimpleSubNavHead';
import CreateProductDialog from '../common/CreateProductDialog';
import DialogProduct from './DialogProduct';
import connect from './store';
import { Link } from '../../routes';
import style from './style';
import redirect from '../../libraries/redirect';
import MyDialogs from './MyDialogs';

class Dialog extends Component {
  state = {
    openSearch: false,
    keyword: '',
    pagination: {
      limit: 20,
      offset: 0
    },
    createItemDialogStatus: false
  };

  setOpenSearch = value => {
    this.setState({ openSearch: value });
  };

  openCreateItemDialog = () => {
    this.setState({ createItemDialogStatus: true });
  };

  closeCreateItemDialog = () => {
    this.setState({ createItemDialogStatus: false });
  };

  createItem = title => {
    const { createDialog, projectId } = this.props;
    createDialog({ title, values: [], projectId }).then(response => {
      this.closeCreateItemDialog();
      const dialogId = response.data.createDialog.id;
      redirect({}, `/${projectId}/dialog/${dialogId}`);
    });
  };

  setKeyword = keyword => {
    this.setState({ keyword });
  };

  setOffsetPagination = offset => {
    this.setState(prevState => ({
      pagination: { ...prevState.pagination, offset }
    }));
  };

  activeDialog = currentDialogId => currentDialogId === this.props.dialogId;

  render() {
    const {
      keyword,
      pagination,
      createItemDialogStatus,
      openSearch
    } = this.state;
    const { projectId, dialogId, classes } = this.props;
    return (
      <MyDialogs
        projectId={projectId}
        keyword={keyword}
        offset={pagination.offset}
        limit={pagination.limit}
      >
        {myDialogs => (
          <LayoutProvider
            navigation={() => <Navigation />}
            subNavigation={() => (
              <SubNavigation
                header={() =>
                  myDialogs && (
                    <SimpleHeader
                      openSearch={openSearch}
                      setOpenSearch={this.setOpenSearch}
                      title="Dialogs"
                      onAddItem={this.openCreateItemDialog}
                      handleClickPagination={this.setOffsetPagination}
                      pagination={{
                        ...pagination,
                        dataLength: myDialogs.pageInfo.total
                      }}
                      keyword={keyword}
                      setKeyword={this.setKeyword}
                    />
                  )
                }
                body={() =>
                  myDialogs && myDialogs.dialogs.length > 0 ? (
                    <List component="nav">
                      {myDialogs.dialogs.map(myDialog => (
                        <Link
                          route={`/${projectId}/dialog/${myDialog.id}`}
                          key={myDialog.id}
                        >
                          <Tooltip title={myDialog.title} placement="right">
                            <ListItem
                              className={classes.listItem}
                              dense
                              divider
                              button
                            >
                              <ListItemText
                                primary={myDialog.title}
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  noWrap: true,
                                  className: classNames({
                                    [classes.listItemTextActive]: this.activeDialog(
                                      myDialog.id
                                    )
                                  })
                                }}
                              />
                            </ListItem>
                          </Tooltip>
                        </Link>
                      ))}
                    </List>
                  ) : (
                    <Typography
                      variant="caption"
                      className={classes.noData}
                      color="primary"
                    >
                      No data available.
                    </Typography>
                  )
                }
              />
            )}
          >
            {dialogId && (
              <DialogProduct
                key={dialogId}
                dialogId={dialogId}
                projectId={projectId}
              />
            )}
            <CreateProductDialog
              placeholder="Dialog Name"
              message="Add new dialog"
              open={createItemDialogStatus}
              handleClose={this.closeCreateItemDialog}
              handleConfirm={this.createItem}
            />
          </LayoutProvider>
        )}
      </MyDialogs>
    );
  }
}

Dialog.defaultProps = {
  dialogId: null
};

Dialog.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  createDialog: PropTypes.func.isRequired,
  dialogId: PropTypes.string
};

export default withStyles(style)(connect(Dialog));
