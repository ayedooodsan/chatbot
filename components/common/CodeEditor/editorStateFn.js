import { Modifier, EditorState } from 'draft-js';

export const setAsCodeBlock = editorState => {
  const contentstate = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const newContentState = Modifier.setBlockType(
    contentstate,
    selectionState,
    'code-block'
  );
  const newEditorState = EditorState.push(editorState, newContentState);
  return newEditorState;
};

export const blockType = 'code-block';
