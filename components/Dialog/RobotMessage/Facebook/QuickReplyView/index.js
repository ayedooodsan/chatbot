import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';

const QuickReplyView = props => {
  const { value, classes } = props;
  return (
    <React.Fragment>
      <Typography variant="caption">{value.title}</Typography>
      {value.replies.map(reply => (
        <Chip
          key={reply}
          label={reply}
          variant="outlined"
          className={classes.chip}
        />
      ))}
    </React.Fragment>
  );
};

QuickReplyView.propTypes = {
  value: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(QuickReplyView);
