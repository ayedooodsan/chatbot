import PropTypes from 'prop-types';

const EntityChip = props => {
  const { contentState, classes, entityKey, children } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} style={classes.link}>
      {children}
    </a>
  );
};

EntityChip.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired
};

export default EntityChip;
