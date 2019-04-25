import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const EntityChip = props => {
  const { classes, children } = props;
  const { color } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <span className={classes.select} style={{ backgroundColor: color }}>
      {children}
    </span>
  );
};

EntityChip.propTypes = {
  classes: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};

export default withStyles(style)(EntityChip);
