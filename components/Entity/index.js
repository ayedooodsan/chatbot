import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
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

class Entity extends Component {
  state = {
    keyword: '',
    pagination: {
      limit: 20,
      offset: 0,
      total: 1000
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
    const { keyword, pagination, createItemDialogStatus } = this.state;
    const { projectId, entityId, classes } = this.props;
    return (
      <MyEntities
        projectId={projectId}
        limit={pagination.limit}
        offset={pagination.offset}
        keyword={keyword}
      >
        {myEntities => (
          <LayoutProvider
            navigation={() => <Navigation />}
            subNavigation={() => (
              <SubNavigation
                header={() =>
                  myEntities && (
                    <SimpleHeader
                      title="Entities"
                      onAddItem={this.openCreateItemDialog}
                      handleClickPagination={this.setOffsetPagination}
                      pagination={{
                        ...pagination,
                        dataLength: myEntities.pageInfo.total
                      }}
                      keyword={keyword}
                      setKeyword={this.setKeyword}
                    />
                  )
                }
                body={() =>
                  myEntities && (
                    <List component="nav">
                      {myEntities.entities.map(myEntity => (
                        <Link
                          route={`/${projectId}/entity/${myEntity.id}`}
                          key={myEntity.id}
                        >
                          <Tooltip title={myEntity.title} placement="right">
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
                          </Tooltip>
                        </Link>
                      ))}
                    </List>
                  )
                }
              />
            )}
          >
            {entityId && (
              <EntityProduct entityId={entityId} projectId={projectId} />
            )}
            <CreateProductDialog
              placeholder="Entity Name"
              message="Add new entity"
              open={createItemDialogStatus}
              handleClose={this.closeCreateItemDialog}
              handleConfirm={this.createItem}
            />
          </LayoutProvider>
        )}
      </MyEntities>
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
