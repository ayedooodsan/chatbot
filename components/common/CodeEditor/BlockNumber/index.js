import React from 'react';
import PropTypes from 'prop-types';
import { EditorBlock } from 'draft-js';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const BlockNumber = props => {
  const { block, contentState, classes } = props;
  const text = contentState.getBlockForKey(block.key).getText();
  return (
    <div
      className={classes.line}
      data-line-number={text
        .split('\n')
        .map((value, index) => index + 1)
        .join('\n')}
    >
      <div className={classes.lineText}>
        <EditorBlock {...props} />
      </div>
    </div>
  );
};

BlockNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired
};

export default withStyles(style)(BlockNumber);
