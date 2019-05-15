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
import EntityProduct from './EntityProduct';
import connect from './store';
import { Link } from '../../routes';
import style from './style';
import redirect from '../../libraries/redirect';

class Entity extends Component {
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
    const { myEntities, projectId, entityId, classes } = this.props;
    return (
      <LayoutProvider
        navigation={() => <Navigation />}
        subNavigation={() => (
          <SubNavigation
            header={() => (
              <SimpleHeader
                title="Entities"
                onAddItem={this.openCreateItemDialog}
                handleClickPagination={this.setOffsetPagination}
                pagination={{ ...pagination, dataLength: myEntities.length }}
                keyword={keyword}
                setKeyword={this.setKeyword}
              />
            )}
            body={() =>
              myEntities && (
                <List component="nav">
                  {myEntities.map(myEntity => (
                    <Link
                      route={`/${projectId}/entity/${myEntity.id}`}
                      key={myEntity.id}
                    >
                      <ListItem dense button>
                        <ListItemText
                          primary={myEntity.title}
                          primaryTypographyProps={{
                            noWrap: true,
                            className: classNames({
                              [classes.listItemTextActive]: this.activeEntity(
                                myEntity.id
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
    );
  }
}

Entity.defaultProps = {
  myEntities: [],
  entityId: null
};

Entity.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  createEntity: PropTypes.func.isRequired,
  entityId: PropTypes.string,
  myEntities: PropTypes.array
};

export default withStyles(style)(connect(Entity));
