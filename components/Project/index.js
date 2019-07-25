import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import RootRef from '@material-ui/core/RootRef';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Scrollbar from 'react-scrollbars-custom';
import CreateProductDialog from '../common/CreateProductDialog';
import connect from './store';
import style from './style';
import redirect from '../../libraries/redirect';

const Project = props => {
  const {
    projectId,
    myProjects,
    classes,
    collapse,
    createProject,
    actions: { setProjectRole }
  } = props;
  const rootRef = useRef(null);
  const activeProject = myProjects.find(
    myProject => myProject.id === projectId
  ) || { title: '' };
  const getInitialProject = title =>
    title.split(' ').reduce((initial, word) => initial + word.charAt(0), '');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (projectId && myProjects.length > 0) {
      setOpen(false);
      const newActiveProject = myProjects.find(
        myProject => myProject.id === projectId
      );
      if (newActiveProject) {
        setProjectRole(
          newActiveProject.sharedProject ? 'Collaborator' : 'Admin'
        );
      }
    }
  }, [projectId, myProjects]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const createItem = title => {
    createProject({ title }).then(response => {
      setOpenCreateDialog(false);
      const { id } = response.data.createProject;
      redirect({}, `/${id}/entity`);
    });
  };

  const toProject = newProjectId => {
    props.updateActiveProject({ id: newProjectId }).then(response => {
      if (response.data.updateActiveProject) {
        redirect({}, `/${newProjectId}/entity`);
      }
    });
  };

  return (
    <RootRef rootRef={rootRef}>
      <React.Fragment>
        <List>
          {!collapse ? (
            <Tooltip title={`${activeProject.title} Project`} placement="right">
              <ListItem
                button
                onClick={() => {
                  setOpen(!open);
                }}
                className={classes.listItem}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <Avatar className={classes.avatar}>
                    {getInitialProject(activeProject.title)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary="Project"
                  secondary={activeProject.title}
                  className={classes.listItemText}
                  primaryTypographyProps={{
                    variant: 'subtitle2',
                    className: classNames(classes.listItemTextTyp, {
                      [classes.listItemTextTypClose]: !collapse
                    })
                  }}
                  secondaryTypographyProps={{
                    className: classNames(
                      classes.listItemTextTyp,
                      classes.listItemTextTypSecondary,
                      {
                        [classes.listItemTextTypClose]: !collapse
                      }
                    )
                  }}
                />
              </ListItem>
            </Tooltip>
          ) : (
            <ListItem
              button
              onClick={() => {
                setOpen(!open);
              }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Avatar className={classes.avatar}>
                  {getInitialProject(activeProject.title)}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Project"
                secondary={activeProject.title}
                className={classes.listItemText}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  className: classNames(classes.listItemTextTyp, {
                    [classes.listItemTextTypClose]: !collapse
                  })
                }}
                secondaryTypographyProps={{
                  className: classNames(
                    classes.listItemTextTyp,
                    classes.listItemTextTypSecondary,
                    {
                      [classes.listItemTextTypClose]: !collapse
                    }
                  )
                }}
              />
            </ListItem>
          )}
        </List>
        <Popper
          open={open}
          anchorEl={rootRef.current}
          transition
          style={{ zIndex: 2000 }}
          placement="right-start"
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <div>
                <Paper className={classes.menuContainer}>
                  <div className={classes.menuRoot}>
                    <Typography
                      variant="overline"
                      className={classes.menuTitle}
                    >
                      Switch Project
                    </Typography>
                    <div>
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                  <Divider />
                  <div className={classes.menus}>
                    <Scrollbar contentProps={{ style: { width: '100%' } }}>
                      <List component="nav" dense className={classes.list}>
                        {myProjects
                          .filter(
                            myProject => myProject.id !== activeProject.id
                          )
                          .map(myProject => (
                            <ListItem
                              button
                              key={myProject.id}
                              onClick={() => toProject(myProject.id)}
                            >
                              <ListItemIcon className={classes.listItemIcon}>
                                <Avatar className={classes.avatar}>
                                  {getInitialProject(myProject.title)}
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                secondary={
                                  myProject.sharedProject
                                    ? `by ${myProject.user.username}`
                                    : null
                                }
                                primary={myProject.title}
                              />
                            </ListItem>
                          ))}
                      </List>
                    </Scrollbar>
                  </div>
                  <Divider />
                  <Button
                    fullWidth
                    size="small"
                    color="primary"
                    onClick={() => {
                      setOpen(false);
                      setOpenCreateDialog(true);
                    }}
                    className={classes.button}
                  >
                    Add Project
                  </Button>
                </Paper>
              </div>
            </Grow>
          )}
        </Popper>
        <CreateProductDialog
          placeholder="Project Name"
          message="Add new project"
          open={openCreateDialog}
          handleClose={() => {
            setOpenCreateDialog(false);
          }}
          handleConfirm={createItem}
        />
      </React.Fragment>
    </RootRef>
  );
};

Project.defaultProps = {
  myProjects: []
};

Project.propTypes = {
  projectId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  collapse: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  updateActiveProject: PropTypes.func.isRequired,
  refetchMyProject: PropTypes.func.isRequired,
  myProjects: PropTypes.array
};

export default withStyles(style)(connect(Project));
