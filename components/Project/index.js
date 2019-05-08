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
import CreateProductDialog from '../common/CreateProductDialog';
import { Link } from '../../routes';
import connect from './store';
import style from './style';
import redirect from '../../libraries/redirect';

const Project = props => {
  const { projectId, myProjects, classes, collapse, createProject } = props;
  const rootRef = useRef(null);
  const activeProject = myProjects.find(
    myProject => myProject.id === projectId
  ) || { title: '' };
  const getInitialProject = title =>
    title.split(' ').reduce((initial, word) => initial + word.charAt(0), '');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [projectId]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const createItem = title => {
    createProject({ title }).then(response => {
      setOpenCreateDialog(false);
      const { id } = response.data.createProject;
      redirect({}, `/${id}/entity`);
    });
  };
  return (
    <RootRef rootRef={rootRef}>
      <React.Fragment>
        <List>
          {!collapse ? (
            <Tooltip
              title="Project"
              classes={{
                tooltip: classes.lightTooltip,
                popper: classes.lightPopper
              }}
              placement="right"
            >
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
              <Paper className={classes.menuContainer}>
                <React.Fragment>
                  <Typography variant="overline" className={classes.menuTitle}>
                    Switch Project
                  </Typography>
                  <Divider />
                  <List component="nav" dense>
                    {myProjects.map(myProject => (
                      <Link
                        key={myProject.id}
                        route={`/${myProject.id}/entity`}
                      >
                        <ListItem button>
                          <ListItemIcon className={classes.listItemIcon}>
                            <Avatar className={classes.avatar}>
                              {getInitialProject(myProject.title)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText primary={myProject.title} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
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
                </React.Fragment>
              </Paper>
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
  collapse: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  myProjects: PropTypes.array
};

export default withStyles(style)(connect(Project));
