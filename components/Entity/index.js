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
import EntityProduct from './EntityProduct';
import connect from './store';
import { Link } from '../../routes';
import style from './style';
import redirect from '../../libraries/redirect';
import MyEntities from './MyEntities';
import SearchEntities from './SearchEntities';
import SearchView from '../common/SearchView';

class Entity extends Component {
  state = {
    openSearch: false,
    keyword: '',
    pagination: {
      limit: 20,
      offset: 0,
      total: 1000
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
    const { createEntity, projectId } = this.props;
    createEntity({ title, values: [], projectId }).then(response => {
      this.closeCreateItemDialog();
      const entityId = response.data.createEntity.id;
      redirect({}, `/${projectId}/entity/${entityId}`);
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

  activeEntity = currentEntityId => currentEntityId === this.props.entityId;

  render() {
    const {
      keyword,
      pagination,
      createItemDialogStatus,
      openSearch,
      advancedSearch
    } = this.state;
    const { projectId, entityId, classes } = this.props;
    const EntitiesProvider = advancedSearch ? SearchEntities : MyEntities;
    return (
      <LayoutProvider
        navigation={() => <Navigation />}
        subNavigation={() => (
          <EntitiesProvider
            offset={pagination.offset}
            limit={pagination.limit}
            projectId={projectId}
            keyword={keyword}
          >
            {entityProvider => (
              <SubNavigation
                header={() =>
                  entityProvider && (
                    <SimpleHeader
                      openSearch={openSearch}
                      setOpenSearch={this.setOpenSearch}
                      hasAdvanceSearch
                      advancedSearch={advancedSearch}
                      setAdvancedSearch={this.setAdvancedSearch}
                      title="Entities"
                      onAddItem={this.openCreateItemDialog}
                      handleClickPagination={this.setOffsetPagination}
                      pagination={{
                        ...pagination,
                        dataLength: entityProvider.pageInfo.total
                      }}
                      keyword={keyword}
                      setKeyword={this.setKeyword}
                    />
                  )
                }
                body={() =>
                  entityProvider && entityProvider.entities.length > 0 ? (
                    <List component="nav">
                      {entityProvider.entities.map((myEntity, index) => (
                        <Link
                          route={`/${projectId}/entity/${myEntity.id}`}
                          key={myEntity.id}
                        >
                          <Tooltip title={myEntity.title} placement="right">
                            {advancedSearch ? (
                              <SearchView
                                productTitle={myEntity.title}
                                activeId={entityId}
                                index={index}
                                id={myEntity.id}
                                searchResult={myEntity.searchResult}
                              />
                            ) : (
                              <ListItem
                                className={classes.listItem}
                                dense
                                variant
                                button
                              >
                                <ListItemText
                                  primary={myEntity.title}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    noWrap: true,
                                    className: classNames({
                                      [classes.listItemTextActive]: this.activeEntity(
                                        myEntity.id
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
          </EntitiesProvider>
        )}
      >
        {entityId && (
          <EntityProduct
            key={entityId}
            entityId={entityId}
            projectId={projectId}
          />
        )}
        <CreateProductDialog
          placeholder="Entity Name"
          message="Add new entity"
          open={createItemDialogStatus}
          handleClose={this.closeCreateItemDialog}
          handleConfirm={this.createItem}
        />
      </LayoutProvider>
    );
  }
}

Entity.defaultProps = {
  entityId: null
};

Entity.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  createEntity: PropTypes.func.isRequired,
  entityId: PropTypes.string
};

export default withStyles(style)(connect(Entity));
