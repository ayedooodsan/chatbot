import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

class Dialog extends Component {
  state = {
    keyword: '',
    pagination: {
      limit: 10000,
      offset: 1
    },
    createItemDialogStatus: false
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
    const { keyword, pagination, createItemDialogStatus } = this.state;
    const { myDialogs, projectId, dialogId, classes } = this.props;
    return (
      <LayoutProvider
        navigation={() => <Navigation />}
        subNavigation={() => (
          <SubNavigation
            header={() => (
              <SimpleHeader
                title="Dialogs"
                onAddItem={this.openCreateItemDialog}
                handleClickPagination={this.setOffsetPagination}
                pagination={{ ...pagination, dataLength: myDialogs.length }}
                keyword={keyword}
                setKeyword={this.setKeyword}
              />
            )}
            body={() =>
              myDialogs && (
                <List component="nav">
                  {myDialogs.map(myDialog => (
                    <Link
                      route={`/${projectId}/dialog/${myDialog.id}`}
                      key={myDialog.id}
                    >
                      <ListItem
                        className={classNames({
                          [classes.listItemActive]: this.activeDialog(
                            myDialog.id
                          )
                        })}
                        button
                      >
                        <ListItemText
                          primary={myDialog.title}
                          primaryTypographyProps={{
                            className: classNames({
                              [classes.listItemTextActive]: this.activeDialog(
                                myDialog.id
                              )
                            })
                          }}
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              )
            }
          />
        )}
      >
        {dialogId && (
          <DialogProduct dialogId={dialogId} projectId={projectId} />
        )}
        <CreateProductDialog
          placeholder="Dialog Name"
          message="Add new dialog"
          open={createItemDialogStatus}
          handleClose={this.closeCreateItemDialog}
          handleConfirm={this.createItem}
        />
      </LayoutProvider>
    );
  }
}

Dialog.defaultProps = {
  myDialogs: [],
  dialogId: null
};

Dialog.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  createDialog: PropTypes.func.isRequired,
  dialogId: PropTypes.string,
  myDialogs: PropTypes.array
};

export default withStyles(style)(connect(Dialog));
