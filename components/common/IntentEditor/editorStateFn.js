import { Modifier, EditorState } from 'draft-js';

export const addEntity = (editorState, { type, mutability, data }) => {
  const contentstate = editorState.getCurrentContent();
  let newContentState = contentstate.createEntity(type, mutability, data);
  const entityKey = contentstate.getLastCreatedEntityKey();
  const selectionState = editorState.getSelection();
  newContentState = Modifier.applyEntity(
    newContentState,
    selectionState,
    entityKey
  );
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-entity'
  );
  return newEditorState;
};

export const changeEntity = (
  editorState,
  selectionState,
  { type, mutability, data }
) => {
  const contentstate = editorState.getCurrentContent();
  let newContentState = contentstate.createEntity(type, mutability, data);
  const entityKey = contentstate.getLastCreatedEntityKey();
  newContentState = Modifier.applyEntity(
    newContentState,
    selectionState,
    entityKey
  );
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-entity'
  );
  return newEditorState;
};

export const removeSelectedEntity = editorState => {
  const contentstate = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const newContentState = Modifier.applyEntity(
    contentstate,
    selectionState,
    null
  );
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-entity'
  );
  return newEditorState;
};

export const removeEntity = (editorState, selectionState) => {
  const contentstate = editorState.getCurrentContent();
  const newContentState = Modifier.applyEntity(
    contentstate,
    selectionState,
    null
  );
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-entity'
  );
  return newEditorState;
};

export const setSelection = (editorState, anchorOffset, focusOffset) => {
  let newEditorState = null;
  const selectionState = editorState.getSelection();
  if (typeof anchorOffset === 'number' && typeof focusOffset === 'number') {
    const newSelection = selectionState.merge({
      anchorOffset,
      focusOffset
    });
    newEditorState = EditorState.acceptSelection(editorState, newSelection);
  }
  return newEditorState;
};

export const setForceSelection = (editorState, anchorOffset, focusOffset) => {
  let newEditorState = null;
  const selectionState = editorState.getSelection();
  if (typeof anchorOffset === 'number' && typeof focusOffset === 'number') {
    const newSelection = selectionState.merge({
      anchorOffset,
      focusOffset
    });
    newEditorState = EditorState.forceSelection(editorState, newSelection);
  }
  return newEditorState;
};

export const getEntityAtCursor = editorState => {
  const selectionState = editorState.getSelection();
  const selectionKey = selectionState.getStartKey();
  const contentstate = editorState.getCurrentContent();
  const block = contentstate.getBlockForKey(selectionKey);
  const entityKey = block.getEntityAt(selectionState.getStartOffset());

  if (entityKey) {
    const entityInstance = contentstate.getEntity(entityKey);
    return entityInstance;
  }
  return null;
};
