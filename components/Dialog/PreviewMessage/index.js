import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import withStyles from '@material-ui/core/styles/withStyles';

import style from './style';

const PreviewMessage = props => {
  const { title, subtitle, reset, classes, footTitle } = props;
  return (
    <div className={classes.root}>
      <div className={classes.strechWidth}>
        <Paper elevation={0} className={classes.preview}>
          <div className={classes.text}>
            <Typography variant="subtitle2" color="primary">
              {title}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
            {footTitle && (
              <Typography variant="caption" color="primary">
                {footTitle}
              </Typography>
            )}
          </div>
          <div className={classes.button}>
            <IconButton onClick={reset}>
              <Clear />
            </IconButton>
          </div>
        </Paper>
      </div>
    </div>
  );
};

PreviewMessage.defaultProps = {
  footTitle: null
};

PreviewMessage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  footTitle: PropTypes.string
};

export default withStyles(style)(PreviewMessage);
