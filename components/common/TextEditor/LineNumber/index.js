import React from 'react';
import PropTypes from 'prop-types';
import { EditorBlock } from 'draft-js';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const LineNumber = props => {
  const { block, contentState, classes } = props;
  const text = contentState.getBlockForKey(block.key).getText();
  const lineNumber =
    contentState
      .getBlockMap()
      .toList()
      .findIndex(item => item.key === block.key) + 1;
  return (
    <div
      className={classes.line}
      data-line-number={`${lineNumber}\n${text
        .split('\n')
        .map(() => '')
        .join('\n')}`}
    >
      <div className={classes.lineText}>
        <EditorBlock {...props} />
      </div>
    </div>
  );
};

LineNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired
};

export default withStyles(style)(LineNumber);
