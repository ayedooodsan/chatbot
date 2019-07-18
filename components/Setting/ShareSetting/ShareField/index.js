import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SimpleAutoComplete from '../SimpleAutoComplete';
import UserSuggestions from '../../../common/UserSuggestions';
import style from './style';

const ShareField = props => {
  const { initialValue, onChange, onDelete, classes } = props;
  const [user, setUser] = useState(initialValue);
  useEffect(() => {
    onChange(user);
  }, [user]);
  return (
    <Paper className={classes.root} elevation={1}>
      <SimpleAutoComplete
        className={classes.noMarginTop}
        onChange={setUser}
        placeholder="Username"
        initialInputValue={user.username}
        initialValue={user}
        suggestions={(inputValue, children) => {
          return (
            <UserSuggestions keyword={inputValue}>{children}</UserSuggestions>
          );
        }}
      />
      <IconButton
        onClick={onDelete}
        className={classes.iconButton}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

ShareField.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(ShareField);
