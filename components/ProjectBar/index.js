import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Poppers from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Clear from '@material-ui/icons/Clear';
import Send from '@material-ui/icons/Send';
import { useForm, useField } from 'react-final-form-hooks';
import { withRouter } from 'next/router';

import { isTypeOfString } from '../../libraries/helpers';
import CustomInput from '../CustomInput';
import style from './style';
import connect from './store';

const onSubmit = data => {
  console.log(data);
};

const validate = values => {
  const errors = {};
  if (!values.newAgent) {
    errors.newAgent = 'Agent name is required';
  }
  return errors;
};

const ProjectBar = props => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const { form, handleSubmit } = useForm({
    onSubmit,
    validate
  });
  const newAgent = useField('newAgent', form);
  const { classes, router, myProjects } = props;

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { projectId } = router.query;
  const activeProject =
    myProjects.find(myProject => myProject.id === projectId) || {};
  const projects = myProjects.filter(myProject => myProject.id !== projectId);
  const toglleOpen = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };
  return (
    <div>
      <div className={classes.container} ref={anchorEl}>
        <Typography variant="subtitle2" color="inherit">
          {activeProject.title}
        </Typography>
        <IconButton onClick={toglleOpen} color="primary" size="medium">
          {open ? <Clear /> : <KeyboardArrowDown />}
        </IconButton>
        <Poppers
          open={open}
          anchorEl={anchorEl.current}
          transition
          disablePortal
          placement="bottom"
          className={`${classNames({ [classes.popperClose]: !open })} ${
            classes.pooperNav
          }`}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} id="menu-list-grow">
              <Paper className={classes.menuContainer}>
                <ClickAwayListener>
                  <React.Fragment>
                    <Typography
                      variant="overline"
                      className={classes.menuTitle}
                    >
                      SWITCH PROJECT
                    </Typography>
                    <MenuList role="menu" className={classes.resetPaddingTop}>
                      {projects.map(project => (
                        <MenuItem
                          onClick={handleClose}
                          className={classes.dropdownItem}
                        >
                          <Typography variant="caption">
                            {project.title}
                          </Typography>
                        </MenuItem>
                      ))}
                    </MenuList>
                    <Divider light />
                    <form
                      onSubmit={handleSubmit}
                      className={classes.newAgentForm}
                    >
                      <CustomInput
                        labelText="New Agent"
                        helperText={
                          newAgent.meta.submitFailed && newAgent.meta.error
                        }
                        formControlProps={{
                          className: classes.resetMarginTop,
                          fullWidth: true,
                          error:
                            newAgent.meta.submitFailed &&
                            isTypeOfString(newAgent.meta.error)
                        }}
                        inputProps={newAgent.input}
                      />
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        type="submit"
                        size="medium"
                      >
                        <Send />
                      </IconButton>
                    </form>
                  </React.Fragment>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
};

ProjectBar.defaultProps = {
  myProjects: []
};

ProjectBar.propTypes = {
  classes: PropTypes.object.isRequired,
  myProjects: PropTypes.object,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(connect(withRouter(ProjectBar)));
