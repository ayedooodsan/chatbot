/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Editor, EditorState } from 'draft-js';
import style from './style';

const IntentField = props => {
  const { onDelete, classes } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <Paper className={classes.root} elevation={1}>
      <div
        onClick={focusEditor}
        className={classNames(
          classes.inputRoot,
          classes.multiline,
          classes.fullWidth
        )}
      >
        <div className={classNames(classes.input, classes.inputMultiline)}>
          <Editor
            placeholder="User say"
            ref={editor}
            editorState={editorState}
            onChange={newEditorState => setEditorState(newEditorState)}
          />
        </div>
      </div>
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

IntentField.propTypes = {
  intialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(IntentField);
