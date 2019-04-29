import { useReducer } from 'react';
import { SelectionState } from 'draft-js';
import { changeEntity, removeEntity, getEntityAtCursor } from './editorStateFn';

export const getSelectionState = currentEditorState => {
  const selectionState = currentEditorState.getSelection();
  const currentOffset = selectionState.getAnchorOffset();
  const currentBlockKey = selectionState.getAnchorKey();
  const currentFocusOffset = selectionState.getFocusOffset();
  const currentFocused = selectionState.getHasFocus();
  return {
    currentOffset,
    currentFocusOffset,
    currentBlockKey,
    currentFocused
  };
};

const ON_CHANGE = 'ON_CHANGE';
const ON_POPPER_FOCUS = 'ON_POPPER_FOCUS';
const ON_POPPER_BLUR = 'ON_POPPER_BLUR';

const initialState = {
  offset: 0,
  length: 0,
  anchorEl: {},
  focused: false,
  hasFakeSelection: false
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ON_CHANGE: {
      return { ...state, ...payload };
    }
    case ON_POPPER_FOCUS: {
      const { focused, hasFakeSelection } = payload;
      return { ...state, focused, hasFakeSelection };
    }
    case ON_POPPER_BLUR: {
      const { focused, hasFakeSelection } = payload;
      return { ...state, focused, hasFakeSelection };
    }
    default:
      return state;
  }
};

const useSelectionListener = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { offset, length, anchorEl, hasFakeSelection, blockKey } = state;

  const updateSelection = (currentEditorState, visibleSelectionRect) => {
    let modifiedEditorState = currentEditorState;
    const {
      currentOffset,
      currentFocusOffset,
      currentBlockKey
    } = getSelectionState(currentEditorState);

    const newOffset =
      currentFocusOffset < currentOffset ? currentFocusOffset : currentOffset;

    let newLength = currentFocusOffset - currentOffset;
    newLength = newLength < 0 ? -1 * newLength : newLength;

    let newAnchorEl = anchorEl;
    if (length !== newLength || offset !== newOffset) {
      if (visibleSelectionRect !== null) {
        newAnchorEl = {
          clientWidth: visibleSelectionRect.width,
          clientHeight: visibleSelectionRect.height,
          getBoundingClientRect: () => visibleSelectionRect
        };
      }
    }

    if (hasFakeSelection) {
      const generatedSelectionState = SelectionState.createEmpty(
        blockKey
      ).merge({
        anchorOffset: offset,
        focusOffset: offset + length
      });
      const entityInstance = getEntityAtCursor(modifiedEditorState);
      if (entityInstance !== null && entityInstance.type === 'SELECT-WORD') {
        modifiedEditorState = removeEntity(
          modifiedEditorState,
          generatedSelectionState
        );
      }
      dispatch({
        type: ON_CHANGE,
        payload: {
          offset: newOffset,
          focused: true,
          length: newLength,
          blockKey: currentBlockKey,
          anchorEl: newAnchorEl,
          hasFakeSelection: false
        }
      });
    } else {
      dispatch({
        type: ON_CHANGE,
        payload: {
          offset: newOffset,
          focused: true,
          length: newLength,
          blockKey: currentBlockKey,
          anchorEl: newAnchorEl
        }
      });
    }
    return modifiedEditorState;
  };

  const onPopperFocus = currentEditorState => {
    const generatedSelectionState = SelectionState.createEmpty(blockKey).merge({
      anchorOffset: offset,
      focusOffset: offset + length
    });
    const newEditorState = changeEntity(
      currentEditorState,
      generatedSelectionState,
      {
        type: 'SELECT-WORD',
        mutability: 'MUTABLE',
        data: {}
      }
    );
    dispatch({
      type: ON_POPPER_FOCUS,
      payload: {
        focused: true,
        hasFakeSelection: true
      }
    });
    return newEditorState;
  };

  const onPopperBlur = currentEditorState => {
    let modifiedEditorState = currentEditorState;
    if (hasFakeSelection) {
      const generatedSelectionState = SelectionState.createEmpty(
        blockKey
      ).merge({
        anchorOffset: offset,
        focusOffset: offset + length
      });
      modifiedEditorState = removeEntity(
        modifiedEditorState,
        generatedSelectionState
      );
      dispatch({
        type: ON_POPPER_BLUR,
        payload: {
          focused: false,
          hasFakeSelection: false
        }
      });
    } else {
      dispatch({
        type: ON_POPPER_BLUR,
        payload: {
          focused: false
        }
      });
    }
    return modifiedEditorState;
  };

  return {
    state,
    updateSelection,
    onPopperFocus,
    onPopperBlur
  };
};

export default useSelectionListener;
