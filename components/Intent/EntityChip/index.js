/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { SelectionState } from 'draft-js';
import style from './style';

const EntityChip = props => {
  const { classes, children, setEntityRef, offsetKey } = props;
  const data = props.contentState.getEntity(props.entityKey).getData();
  const { color, offset, length } = data;
  const getBlockKey = () => {
    const firstDashIndex = offsetKey.indexOf('-');
    return offsetKey.slice(0, firstDashIndex);
  };
  const selectionState = SelectionState.createEmpty(getBlockKey()).merge({
    anchorOffset: offset,
    focusOffset: offset + length
  });
  return (
    <span
      contentEditable={false}
      className={classes.select}
      style={{ backgroundColor: color }}
      onClick={event => {
        setEntityRef(event.target, data, selectionState);
      }}
    >
      {children}
    </span>
  );
};

EntityChip.propTypes = {
  classes: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  offsetKey: PropTypes.string.isRequired,
  setEntityRef: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};

export default withStyles(style)(EntityChip);
