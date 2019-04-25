/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import {
  Editor,
  EditorState,
  getVisibleSelectionRect,
  convertFromRaw
  // convertToRaw
} from 'draft-js';
import { withRouter } from 'next/router';
import getColor from '../getColor';
import SimpleAutoComplete from '../SimpleAutoComplete';
import EntitySuggestions from '../EntitySuggestions';
import decorator from './decorator';
import useFakeSelection from './useFakeSelection';
import style from './style';

const IntentField = props => {
  const { onDelete, classes, router, initialValue } = props;
  const { projectId } = router.query;
  const generateEditorState = intent => {
    const generatedEditorState = {};
    generatedEditorState.blocks = [
      {
        text: intent.text,
        type: 'unstyled',
        entityRanges: intent.entityRanges.map(entityRange => ({
          offset: entityRange.offset,
          length: entityRange.length,
          key: entityRange.entity.id
        }))
      }
    ];
    generatedEditorState.entityMap = {};
    intent.entityRanges.forEach(entityRange => {
      const entityId = entityRange.entity.id;
      generatedEditorState.entityMap[entityId] = {
        type: 'ENTITY',
        mutability: 'IMMUTABLE',
        data: {
          color: getColor(entityId)
        }
      };
    });
    return generatedEditorState;
  };
  const block = convertFromRaw(generateEditorState(initialValue));
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(block, decorator)
  );
  const {
    state: { length, anchorEl, focused },
    updateSelection,
    onPopperFocus,
    onPopperBlur
  } = useFakeSelection();

  // const getContentState = currentEditorState => {
  //   const contentState = currentEditorState.getCurrentContent();
  //   const rawJson = convertToRaw(contentState);
  //   const jsonStr = JSON.stringify(rawJson, null, 1);
  //   const plainText = contentState.getPlainText();
  //   return {
  //     jsonStr,
  //     plainText
  //   };
  // };

  const onChangeEditorState = newEditorState => {
    let modifiedEditorState = newEditorState;
    const visibleSelectionRect = getVisibleSelectionRect(window);
    modifiedEditorState = updateSelection(
      modifiedEditorState,
      visibleSelectionRect
    );
    // const { jsonStr } = getContentState(modifiedEditorState);
    // console.log(jsonStr);
    setEditorState(modifiedEditorState);
  };

  const editor = useRef(null);

  const onPopperClick = () => {
    const newEditorState = onPopperFocus(editorState);
    setEditorState(newEditorState);
  };

  const onPopperClickAway = () => {
    const modifiedEditorState = onPopperBlur(editorState);
    setEditorState(modifiedEditorState);
  };

  const focusEditor = () => {
    editor.current.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <ClickAwayListener onClickAway={onPopperClickAway}>
      <React.Fragment>
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
                onChange={onChangeEditorState}
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
        <Popper
          open={length > 0 && focused}
          anchorEl={anchorEl}
          transition
          placement="bottom-start"
          onClick={onPopperClick}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={50}>
              <Paper className={classes.autoCompleteContainer}>
                <SimpleAutoComplete
                  input={{}}
                  label="Search entity"
                  initialValue={null}
                  suggestions={(inputValue, children) => {
                    return (
                      <EntitySuggestions
                        projectId={projectId}
                        keyword={inputValue}
                      >
                        {children}
                      </EntitySuggestions>
                    );
                  }}
                />
              </Paper>
            </Fade>
          )}
        </Popper>
      </React.Fragment>
    </ClickAwayListener>
  );
};

IntentField.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(IntentField));
