import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import SubNavigation from '../layout/SubNavigation';
import SimpleHeader from '../layout/SimpleSubNavHead';
import CreateItemDialog from '../common/CreateItemDialog';
import connect from './store';
import { Link } from '../../routes';

class Intent extends Component {
  state = {
    keyword: '',
    pagination: {
      limit: 10,
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
    console.log({ title });
    const { createIntent, projectId } = this.props;
    createIntent({ title, values: [], projectId }).then(() => {
      this.closeCreateItemDialog();
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

  render() {
    const { keyword, pagination, createItemDialogStatus } = this.state;
    const { myIntents, projectId } = this.props;
    return (
      <LayoutProvider
        navigation={() => <Navigation />}
        subNavigation={() => (
          <SubNavigation
            header={() => (
              <SimpleHeader
                title="Intents"
                onAddItem={this.openCreateItemDialog}
                handleClickPagination={this.setOffsetPagination}
                pagination={{ ...pagination, dataLength: myIntents.length }}
                keyword={keyword}
                setKeyword={this.setKeyword}
              />
            )}
            body={() =>
              myIntents && (
                <List component="nav" dense>
                  {myIntents.map(myIntent => (
                    <Link
                      route={`/${projectId}/intent/${myIntent.id}`}
                      key={myIntent.id}
                    >
                      <ListItem button>
                        <ListItemText primary={myIntent.title} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              )
            }
          />
        )}
      >
        Cek
        <CreateItemDialog
          placeholder="Intent Name"
          message="Add new Itent"
          open={createItemDialogStatus}
          handleClose={this.closeCreateItemDialog}
          handleConfirm={this.createItem}
        />
      </LayoutProvider>
    );
  }
}

Intent.defaultProps = {
  myIntents: []
};

Intent.propTypes = {
  projectId: PropTypes.string.isRequired,
  createIntent: PropTypes.func.isRequired,
  myIntents: PropTypes.array
};

export default connect(Intent);
