import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import Bubblechat from '../../common/BubbleChat';

const UserMessage = props => {
  const { text, dialogName, classes } = props;
  return (
    <React.Fragment>
      {dialogName && (
        <div className={classes.dialogName}>
          <Typography variant="caption">Dialog name:</Typography>
          <Typography variant="subtitle2" className={classes.dialogText}>
            {dialogName}
          </Typography>
        </div>
      )}
      <Bubblechat
        type="other"
        className={classNames({
          [classes.hasDialogName]: dialogName
        })}
      >
        <Typography variant="caption">{text}</Typography>
      </Bubblechat>
    </React.Fragment>
  );
};

UserMessage.defaultProps = {
  dialogName: null
};

UserMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  dialogName: PropTypes.string
};

export default withStyles(style)(UserMessage);
