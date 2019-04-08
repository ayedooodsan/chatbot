import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import withStyles from '@material-ui/core/styles/withStyles';

import style from './style';

const PreviewMessage = props => {
  const { title, subtitle, reset, classes, footTitle } = props;
  return (
    <div className={classes.root}>
      <div className={`${classes.strechWidth} ${classes.margin}`}>
        <Paper elevation={0} className={classes.preview}>
          <Typography variant="subtitle2" color="primary">
            {title}
          </Typography>
          <Typography variant="caption">{subtitle}</Typography>
          {footTitle && (
            <Typography variant="caption" color="primary">
              {footTitle}
            </Typography>
          )}
        </Paper>
      </div>
      <Button onClick={reset}>
        <Clear />
      </Button>
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
