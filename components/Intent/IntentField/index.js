/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
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
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import { withRouter } from 'next/router';
import _ from 'lodash';
import {
  addEntity,
  changeEntity,
  removeEntity,
  setSelection,
  setForceSelection
} from './editorStateFn';
import EntityChip from '../EntityChip';
import getColor from '../getColor';
import SimpleAutoComplete from '../SimpleAutoComplete';
import EntitySuggestions from '../EntitySuggestions';
import generateDecorator from './decorator';
import useFakeSelection from './useFakeSelection';
import style from './style';

const IntentField = props => {
  const {
    onDelete,
    onChange,
    classes,
    router,
    initialValue,
    updateParams
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
          const { offset, length } = entityRange;
          const { id } = entityRange.entity;
          return {
            offset: entityRange.offset,
            length: entityRange.length,
            key: `${offset}-${length}-${id}`
          };
        })
      }
    ];
    generatedEditorState.entityMap = {};
    intent.entityRanges.forEach(entityRange => {
      const { offset, length } = entityRange;
      const { id, title } = entityRange.entity;
      generatedEditorState.entityMap[`${offset}-${length}-${id}`] = {
        type: 'ENTITY',
        mutability: 'IMMUTABLE',
        data: {
          offset,
          length,
          color: getColor(id),
          entity: {
            id,
            title
          }
        }
      };
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
  const {
    state: { length, anchorEl, focused, offset },
    updateSelection,
    onPopperFocus,
    onPopperBlur
  } = useFakeSelection();

  const getContentState = currentEditorState => {
    const contentState = currentEditorState.getCurrentContent();
    const rawJson = convertToRaw(contentState);
    return rawJson;
  };

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

  const onUpdateParams = () => {
    updateParams((intents, params) => {
      const addedSubProduct = {};
      const newParams = intents.reduce((currentParams, intent) => {
        intent.entityRanges.forEach(entityRange => {
          const { entity } = entityRange;
          if (!addedSubProduct[entity.id]) {
            const foundSubProduct = params.find(
              subProduct => subProduct.entity.id === entity.id
            );
            if (foundSubProduct) {
              currentParams.push(foundSubProduct);
            } else {
              currentParams.push({
                name: entity.title,
                entity
              });
            }
            addedSubProduct[entity.id] = true;
          }
        });
        return currentParams;
      }, []);
      return newParams;
    });
  };

  const onPushIntent = newEditorState => {
    const rawEditorState = getContentState(newEditorState);
    const newBlock = rawEditorState.blocks[0];
    const { entityMap } = rawEditorState;
    const newIntent = {
      text: newBlock.text,
      entityRanges: newBlock.entityRanges.map(entityRange => ({
        offset: entityRange.offset,
        length: entityRange.length,
        entity: entityMap[entityRange.key].data.entity
      }))
    };
    if (!_.isEqual(initialValue, newIntent)) {
      onChange(newIntent, null, onUpdateParams);
    }
  };

  const onCreateEntity = newEntity => {
    const { id, title } = newEntity;
    if (id) {
      let modifiedEditorState = addEntity(editorState, {
        type: 'ENTITY',
        mutability: 'IMMUTABLE',
        data: {
          offset,
          length,
          color: getColor(id),
          entity: {
            id,
            title
          }
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
    const { id, title } = newEntity;
    if (id) {
      let modifiedEditorState = changeEntity(editorState, selectionState, {
        type: 'ENTITY',
        mutability: 'IMMUTABLE',
        data: {
          offset: entityData.offset,
          length: entityData.length,
          color: getColor(id),
          entity: {
            id,
            title
          }
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

  const onIntentDelete = () => {
    onDelete(onUpdateParams);
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

  return (
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
          onClick={onIntentDelete}
          className={classes.iconButton}
          aria-label="Delete"
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
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
                  label="Search entity"
                  initialValue=""
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
                  label="Search entity"
                  initialValue={
                    entityData.entity ? entityData.entity.title : ''
                  }
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
    </React.Fragment>
  );
};

IntentField.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  updateParams: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(IntentField));
