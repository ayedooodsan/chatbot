import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import SearchView from './SearchView';
import MyIntents from './MyIntents';
import SearchIntents from './SearchIntents';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import SubNavigation from '../layout/SubNavigation';
import SimpleHeader from '../layout/SimpleSubNavHead';
import CreateProductDialog from '../common/CreateProductDialog';
import IntentProduct from './IntentProduct';
import connect from './store';
import { Link } from '../../routes';
import style from './style';
import redirect from '../../libraries/redirect';

class Intent extends Component {
  state = {
    openSearch: false,
    keyword: '',
    pagination: {
      limit: 20,
      offset: 0
    },
    advancedSearch: false,
    createItemDialogStatus: false
  };

  setOpenSearch = value => {
    this.setState({ openSearch: value });
  };

  setAdvancedSearch = value => {
    this.setState({
      advancedSearch: value,
      pagination: {
        limit: 20,
        offset: 0
      }
    });
  };

  openCreateItemDialog = () => {
    this.setState({ createItemDialogStatus: true });
  };

  closeCreateItemDialog = () => {
    this.setState({ createItemDialogStatus: false });
  };

  createItem = title => {
    const { createIntent, projectId } = this.props;
    createIntent({ title, values: [], projectId }).then(response => {
      this.closeCreateItemDialog();
      const intentId = response.data.createIntent.id;
      redirect({}, `/${projectId}/intent/${intentId}`);
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

  activeIntent = currentIntentId => currentIntentId === this.props.intentId;

  render() {
    const {
      keyword,
      pagination,
      createItemDialogStatus,
      advancedSearch,
      openSearch
    } = this.state;
    const { projectId, intentId, classes } = this.props;
    const IntentsProvider = advancedSearch ? SearchIntents : MyIntents;
    return (
      <LayoutProvider
        navigation={() => <Navigation />}
        subNavigation={() => (
          <IntentsProvider
            offset={pagination.offset}
            limit={pagination.limit}
            projectId={projectId}
            keyword={keyword}
          >
            {intentProvider => (
              <SubNavigation
                header={() =>
                  intentProvider && (
                    <SimpleHeader
                      openSearch={openSearch}
                      setOpenSearch={this.setOpenSearch}
                      hasAdvanceSearch
                      advancedSearch={advancedSearch}
                      setAdvancedSearch={this.setAdvancedSearch}
                      title="Intents"
                      onAddItem={this.openCreateItemDialog}
                      handleClickPagination={this.setOffsetPagination}
                      pagination={{
                        ...pagination,
                        dataLength: intentProvider.pageInfo.total
                      }}
                      keyword={keyword}
                      setKeyword={this.setKeyword}
                    />
                  )
                }
                body={() =>
                  intentProvider && (
                    <List component="nav">
                      {intentProvider.intents.map((myIntent, index) => (
                        <Link
                          route={`/${projectId}/intent/${myIntent.id}`}
                          key={myIntent.id}
                        >
                          <Tooltip title={myIntent.title} placement="right">
                            {advancedSearch ? (
                              <SearchView
                                activeId={intentId}
                                index={index}
                                id={myIntent.id}
                                searchResult={myIntent.searchResult}
                              />
                            ) : (
                              <ListItem
                                className={classes.listItem}
                                divider
                                dense
                                button
                              >
                                <ListItemText
                                  primary={myIntent.title}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    noWrap: true,
                                    className: classNames({
                                      [classes.listItemTextActive]: this.activeIntent(
                                        myIntent.id
                                      )
                                    })
                                  }}
                                />
                              </ListItem>
                            )}
                          </Tooltip>
                        </Link>
                      ))}
                    </List>
                  )
                }
              />
            )}
          </IntentsProvider>
        )}
      >
        {intentId && (
          <IntentProduct
            key={intentId}
            intentId={intentId}
            projectId={projectId}
          />
        )}
        <CreateProductDialog
          placeholder="Intent Name"
          message="Add new intent"
          open={createItemDialogStatus}
          handleClose={this.closeCreateItemDialog}
          handleConfirm={this.createItem}
        />
      </LayoutProvider>
    );
  }
}

Intent.defaultProps = {
  intentId: null
};

Intent.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  createIntent: PropTypes.func.isRequired,
  intentId: PropTypes.string
};

export default withStyles(style)(connect(Intent));
