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
import TrainingProduct from './TrainingProduct';
import connect from './store';
import { Link } from '../../routes';
import style from './style';
import redirect from '../../libraries/redirect';

class Training extends Component {
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
    const { createTraining, projectId } = this.props;
    createTraining({ title, values: [], projectId }).then(response => {
      this.closeCreateItemDialog();
      const trainingId = response.data.createTraining.id;
      redirect({}, `/${projectId}/training/${trainingId}`);
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

  activeTraining = currentTrainingId =>
    currentTrainingId === this.props.trainingId;

  render() {
    const { keyword, pagination, createItemDialogStatus } = this.state;
    const { myTrainings, projectId, trainingId, classes } = this.props;
    return (
      <LayoutProvider
        navigation={() => <Navigation />}
        subNavigation={() => (
          <SubNavigation
            header={() => (
              <SimpleHeader
                title="Trainings"
                onAddItem={this.openCreateItemDialog}
                handleClickPagination={this.setOffsetPagination}
                pagination={{ ...pagination, dataLength: myTrainings.length }}
                keyword={keyword}
                setKeyword={this.setKeyword}
              />
            )}
            body={() =>
              myTrainings && (
                <List component="nav">
                  {myTrainings.map(myTraining => (
                    <Link
                      route={`/${projectId}/training/${myTraining.id}`}
                      key={myTraining.id}
                    >
                      <ListItem
                        className={classNames({
                          [classes.listItemActive]: this.activeTraining(
                            myTraining.id
                          )
                        })}
                        button
                      >
                        <ListItemText
                          primary={myTraining.title}
                          primaryTypographyProps={{
                            className: classNames({
                              [classes.listItemPrimaryTextActive]: this.activeTraining(
                                myTraining.id
                              )
                            })
                          }}
                          secondary={myTraining.date}
                          secondaryTypographyProps={{
                            className: classNames({
                              [classes.listItemSecondaryTextActive]: this.activeTraining(
                                myTraining.id
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
        {trainingId && (
          <TrainingProduct trainingId={trainingId} projectId={projectId} />
        )}
        <CreateProductDialog
          placeholder="Training Name"
          message="Add new training"
          open={createItemDialogStatus}
          handleClose={this.closeCreateItemDialog}
          handleConfirm={this.createItem}
        />
      </LayoutProvider>
    );
  }
}

Training.defaultProps = {
  myTrainings: [],
  trainingId: null
};

Training.propTypes = {
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
  createTraining: PropTypes.func.isRequired,
  trainingId: PropTypes.string,
  myTrainings: PropTypes.array
};

export default withStyles(style)(connect(Training));
