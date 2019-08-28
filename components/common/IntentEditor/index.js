/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import LabelIcon from '@material-ui/icons/Label';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Editor,
  EditorState,
  getVisibleSelectionRect,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import { withRouter } from 'next/router';
import uuid from 'uuid/v1';
import connect from './store';
import {
  addEntity,
  changeEntity,
  removeEntity,
  setSelection,
  setForceSelection
} from './editorStateFn';
import EntityChip from './EntityChip';
import getColor from './getColor';
import SimpleAutoComplete from './SimpleAutoComplete';
import EntitySuggestions from '../EntitySuggestions';
import generateDecorator from './decorator';
import useFakeSelection from './useFakeSelection';
import style from './style';

const IntentEditor = props => {
  const {
    classes,
    router,
    initialValue,
    params,
    onChange,
    className,
    annotateUtterance
  } = props;
  const { projectId } = router.query;
  const [entityRef, setEntityRef] = useState(null);
  const [selectionState, setSelectionState] = useState(null);
  const [entityData, setEntityData] = useState({});
  const setNewEntityRef = (newEntityRef, newEntityData, newSelectionState) => {
    setEntityRef(newEntityRef);
    setEntityData(newEntityData);
    setSelectionState(newSelectionState);
  };
  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  const generateEditorState = intent => {
    const generatedEditorState = {};
    generatedEditorState.blocks = [
      {
        text: intent.text,
        type: 'unstyled',
        entityRanges: intent.entityRanges.map(entityRange => {
          const { offset, length, paramKey } = entityRange;
          return {
            offset,
            length,
            key: paramKey
          };
        })
      }
    ];
    generatedEditorState.entityMap = {};
    intent.entityRanges.forEach(entityRange => {
      const { offset, length, paramKey } = entityRange;
      const foundParam = params.find(param => param.key === paramKey);
      if (foundParam) {
        const { entity } = foundParam;
        generatedEditorState.entityMap[paramKey] = {
          type: 'ENTITY',
          mutability: 'IMMUTABLE',
          data: {
            offset,
            length,
            entity,
            color: getColor(paramKey),
            paramKey
          }
        };
      }
    });
    return generatedEditorState;
  };

  const block = convertFromRaw(generateEditorState(initialValue));
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      block,
      generateDecorator(() => {
        return compProps => (
          <EntityChip {...compProps} setEntityRef={setNewEntityRef} />
        );
      })
    )
  );
  useEffect(() => {
    const newBlock = convertFromRaw(generateEditorState(initialValue));
    setEditorState(
      EditorState.createWithContent(
        newBlock,
        generateDecorator(() => {
          return compProps => (
            <EntityChip {...compProps} setEntityRef={setNewEntityRef} />
          );
        })
      )
    );
  }, [initialValue]);
  const {
    state: { length, anchorEl, focused, offset },
    updateSelection,
    onPopperFocus,
    onPopperBlur
  } = useFakeSelection();
  const onChangeEditorState = (newEditorState, onPushIntent) => {
    let modifiedEditorState = newEditorState;
    const visibleSelectionRect = getVisibleSelectionRect(window);
    modifiedEditorState = updateSelection(
      modifiedEditorState,
      visibleSelectionRect
    );
    setEditorState(modifiedEditorState);
    if (onPushIntent) {
      onPushIntent(modifiedEditorState);
    }
  };

  const getContentState = currentEditorState => {
    const contentState = currentEditorState.getCurrentContent();
    const rawJson = convertToRaw(contentState);
    return rawJson;
  };

  const onPushIntent = newEditorState => {
    const rawEditorState = getContentState(newEditorState);
    onChange(rawEditorState);
  };

  const onEditorBlur = () => {
    onPushIntent(editorState);
  };

  const onCreateEntity = newEntity => {
    const { id, title, key } = newEntity;
    if (id) {
      let modifiedEditorState = addEntity(editorState, {
        type: 'ENTITY',
        mutability: 'IMMUTABLE',
        data: {
          offset,
          length,
          color: getColor(key || uuid()),
          entity: {
            id,
            title
          },
          paramKey: key || uuid()
        }
      });
      modifiedEditorState = setForceSelection(
        modifiedEditorState,
        offset + length,
        offset + length
      );
      onChangeEditorState(modifiedEditorState, onPushIntent);
    }
  };

  const onChangeEntity = newEntity => {
    const { id, title, key } = newEntity;
    if (id) {
      let modifiedEditorState = changeEntity(editorState, selectionState, {
        type: 'ENTITY',
        mutability: 'IMMUTABLE',
        data: {
          offset: entityData.offset,
          length: entityData.length,
          color: getColor(key || uuid()),
          entity: {
            id,
            title
          },
          paramKey: key || uuid()
        }
      });
      modifiedEditorState = setForceSelection(
        modifiedEditorState,
        entityData.offset + entityData.length,
        entityData.offset + entityData.length
      );
      setEditorState(modifiedEditorState);
      onPushIntent(modifiedEditorState);
    }
    setEntityRef(null);
    setSelectionState(null);
    setEntityData({});
  };

  const onEntityDelete = () => {
    let modifiedEditorState = removeEntity(editorState, selectionState);
    modifiedEditorState = setForceSelection(
      modifiedEditorState,
      entityData.offset + entityData.length,
      entityData.offset + entityData.length
    );
    setEditorState(modifiedEditorState);
    setEntityRef(null);
    setSelectionState(null);
    setEntityData({});
    onPushIntent(modifiedEditorState);
  };

  const onPopperClick = () => {
    const newEditorState = onPopperFocus(editorState);
    setEditorState(newEditorState);
  };

  const onPopperClickAway = () => {
    if (entityRef === null) {
      let modifiedEditorState = onPopperBlur(editorState);
      modifiedEditorState = setSelection(modifiedEditorState, 0, 0);
      setEditorState(modifiedEditorState);
    }
  };

  const onIntentAnnotate = () => {
    annotateUtterance({
      id: projectId,
      utterance: getContentState(editorState).blocks[0].text
    }).then(response => {
      const { annotateUtterance: annotatedUtterance } = response.data;
      const generatedEditorState = {};
      generatedEditorState.blocks = [
        {
          text: annotatedUtterance.text,
          type: 'unstyled',
          entityRanges: annotatedUtterance.annotations.map(
            (annotation, index) => {
              const { entity } = annotation;
              let key = '';
              const foundParam = params.find(
                param => param.entity.id === entity.id
              );
              if (foundParam) {
                // eslint-disable-next-line prefer-destructuring
                key = foundParam.key;
              } else {
                key = uuid();
              }
              annotatedUtterance.annotations[index].key = key;
              return {
                offset: annotation.offset,
                length: annotation.length,
                key
              };
            }
          )
        }
      ];
      generatedEditorState.entityMap = {};
      annotatedUtterance.annotations.forEach(annotation => {
        const { key, entity } = annotation;
        generatedEditorState.entityMap[key] = {
          type: 'ENTITY',
          mutability: 'IMMUTABLE',
          data: {
            offset: annotation.offset,
            length: annotation.length,
            entity,
            color: getColor(key),
            paramKey: key
          }
        };
      });
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(generatedEditorState),
          generateDecorator(() => {
            return compProps => (
              <EntityChip {...compProps} setEntityRef={setNewEntityRef} />
            );
          })
        )
      );
      onChange(generatedEditorState);
    });
  };

  return (
    <div className={classNames(className, classes.root, classes.fullWidth)}>
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
            onBlur={onEditorBlur}
          />
        </div>
      </div>
      <Popper
        className={classes.popper}
        open={length > 0 && focused && !entityRef}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
        onClick={onPopperClick}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={50}>
            <Paper className={classes.autoCompleteContainer}>
              <ClickAwayListener onClickAway={onPopperClickAway}>
                <SimpleAutoComplete
                  onChange={onCreateEntity}
                  label="Search entity / param"
                  params={params}
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
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Popper
        className={classes.popper}
        open={Boolean(entityRef) && !(length > 0 && focused)}
        anchorEl={entityRef}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={50}>
            <Paper className={classes.autoCompleteContainer}>
              <ClickAwayListener
                onClickAway={() => {
                  setEntityRef(null);
                }}
              >
                <SimpleAutoComplete
                  key={entityRef}
                  onChange={onChangeEntity}
                  onDelete={onEntityDelete}
                  autoFocus
                  label="Search entity / param"
                  initialInputValue={
                    entityData.paramKey
                      ? params.find(param => param.key === entityData.paramKey)
                          .name
                      : ''
                  }
                  params={params}
                  initialValue={entityData.entity ? entityData.entity : {}}
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
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Tooltip title="Annotate" placement="right" aria-label="Annotate">
        <IconButton
          onClick={onIntentAnnotate}
          className={classes.iconButton}
          aria-label="Annotate"
        >
          <LabelIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

IntentEditor.defaultProps = {
  className: ''
};

IntentEditor.propTypes = {
  initialValue: PropTypes.object.isRequired,
  params: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  annotateUtterance: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(style)(connect(withRouter(IntentEditor)));
