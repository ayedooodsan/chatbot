import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import readXlsxFile from 'read-excel-file';
import moment from 'moment';
import UploadFileTemplate from './UploadFileTemplate';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import SubNavigation from '../layout/SubNavigation';
import SimpleHeader from '../layout/SimpleSubNavHead';
import UploadProductDialog from '../common/UploadProductDialog';
import TrainingProduct from './TrainingProduct';
import connect from './store';
import { Link } from '../../routes';
import style from './style';
import redirect from '../../libraries/redirect';
import MyTrainings from './MyTrainings';

class Training extends Component {
  state = {
    openSearch: false,
    keyword: '',
    pagination: {
      limit: 20,
      offset: 0
    },
    uploadProductDialogStatus: false
  };

  setOpenSearch = value => {
    this.setState({ openSearch: value });
  };

  openCreateItemDialog = () => {
    this.setState({ uploadProductDialogStatus: true });
  };

  closeCreateItemDialog = () => {
    this.setState({ uploadProductDialogStatus: false });
  };

  createTrainingInput = rows => {
    rows.splice(0, 1);
    const trainingInputs = rows
      .filter(row => row.every(cell => cell))
      .reduce((currentTrainingInputs, row) => {
        const [title, userSay] = row;
        const foundTrainingInput = currentTrainingInputs.find(
          currentTrainingInput => currentTrainingInput.title === title
        );
        if (!foundTrainingInput) {
          currentTrainingInputs.push({
            title,
            userSays: [userSay.toString()]
          });
        } else {
          foundTrainingInput.userSays.push(userSay.toString());
        }
        return currentTrainingInputs;
      }, []);
    return trainingInputs;
  };

  createItem = async file => {
    const rows = await readXlsxFile(file);
    const trainings = this.createTrainingInput(rows);
    const { createTrainings, projectId } = this.props;
    createTrainings({ trainings, projectId }).then(response => {
      this.closeCreateItemDialog();
      const trainingId = response.data.createTrainings[0].id;
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
    const {
      keyword,
      pagination,
      uploadProductDialogStatus,
      openSearch
    } = this.state;
    const { projectId, trainingId, classes } = this.props;
    return (
      <MyTrainings
        keyword={keyword}
        projectId={projectId}
        limit={pagination.limit}
        offset={pagination.offset}
      >
        {myTrainings =>
          myTrainings && (
            <LayoutProvider
              navigation={() => <Navigation />}
              subNavigation={() => (
                <SubNavigation
                  header={() => (
                    <SimpleHeader
                      openSearch={openSearch}
                      setOpenSearch={this.setOpenSearch}
                      title="Trainings"
                      onAddItem={this.openCreateItemDialog}
                      handleClickPagination={this.setOffsetPagination}
                      pagination={{
                        ...pagination,
                        dataLength: myTrainings.pageInfo.total
                      }}
                      keyword={keyword}
                      setKeyword={this.setKeyword}
                    />
                  )}
                  body={() =>
                    myTrainings && myTrainings.trainings.length > 0 ? (
                      <List component="nav">
                        {myTrainings.trainings.map(myTraining => (
                          <Link
                            route={`/${projectId}/training/${myTraining.id}`}
                            key={myTraining.id}
                          >
                            <Tooltip title={myTraining.title} placement="right">
                              <ListItem
                                className={classes.listItem}
                                divider
                                dense
                                button
                              >
                                <ListItemText
                                  primary={myTraining.title}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    noWrap: true,
                                    className: classNames({
                                      [classes.listItemPrimaryTextActive]: this.activeTraining(
                                        myTraining.id
                                      )
                                    })
                                  }}
                                  secondary={moment(
                                    myTraining.createdAt
                                  ).format('MM/DD/YYYY')}
                                  secondaryTypographyProps={{
                                    variant: 'caption',
                                    className: classNames({
                                      [classes.listItemSecondaryTextActive]: this.activeTraining(
                                        myTraining.id
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
              {trainingId && (
                <TrainingProduct
                  trainingId={trainingId}
                  projectId={projectId}
                />
              )}
              <UploadProductDialog
                placeholder="Choose User Input File"
                message="Upload User Input"
                submessage="You can upload user inputs to the Training tool in one .xlsx file (follow the template below)."
                open={uploadProductDialogStatus}
                handleClose={this.closeCreateItemDialog}
                handleConfirm={this.createItem}
              >
                <UploadFileTemplate />
              </UploadProductDialog>
            </LayoutProvider>
          )
        }
      </MyTrainings>
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
  createTrainings: PropTypes.func.isRequired,
  trainingId: PropTypes.string,
  myTrainings: PropTypes.array
};

export default withStyles(style)(connect(Training));
