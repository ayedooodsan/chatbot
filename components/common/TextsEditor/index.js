import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Draft, { RichUtils, convertToRaw, getDefaultKeyBinding } from 'draft-js';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import LineNumber from './LineNumber';
import style from './style';

class TextsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();

    this.state = {
      focus: false,
      editorState: Draft.EditorState.createEmpty()
    };
  }

  componentDidUpdate() {
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
  }

  blockRendererFn = () => ({
    component: LineNumber
  });

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  keyBindingFn = e => {
    if (e.keyCode === 13) {
      if (e.nativeEvent.shiftKey) {
        return 'soft-new-line';
      }
    }
    return getDefaultKeyBinding(e);
  };

  handleKeyCommand = (command, editorState) => {
    console.log(command);
    let newState = null;
    if (command === 'soft-new-line') {
      newState = RichUtils.insertSoftNewline(editorState);
    } else {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  handlePastedText = (text, html, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const newContentState = Draft.Modifier.replaceText(
      contentState,
      selection,
      text
    );
    const newEditorState = Draft.EditorState.push(
      editorState,
      newContentState,
      'insert-fragment'
    );
    this.onChange(newEditorState);
    return 'handled';
  };

  focusEditor = () => {
    this.editor.current.focus();
  };

  render() {
    const { classes, error, label } = this.props;
    const { focus } = this.state;
    return (
      <Paper
        elevation={0}
        className={classNames(classes.root, {
          [classes.focusRoot]: focus,
          [classes.errorRoot]: error,
          [classes.focusedErrorRoot]: error && focus
        })}
        onClick={this.focusEditor}
      >
        {label && (
          <InputLabel
            className={classNames(classes.inputLabel, {
              [classes.focusInputLabel]: focus,
              [classes.errorInputLabel]: error
            })}
          >
            {label}
          </InputLabel>
        )}
        <div
          className={classNames(
            classes.inputRoot,
            classes.multiline,
            classes.fullWidth
          )}
        >
          <div className={classNames(classes.input, classes.inputMultiline)}>
            <Draft.Editor
              ref={this.editor}
              onFocus={() => this.setState({ focus: true })}
              onBlur={() => this.setState({ focus: false })}
              editorState={this.state.editorState}
              onChange={this.onChange}
              keyBindingFn={this.keyBindingFn}
              handleKeyCommand={this.handleKeyCommand}
              blockRendererFn={this.blockRendererFn}
              handlePastedText={this.handlePastedText}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

TextsEditor.defaultProps = {
  error: false,
  label: null
};

TextsEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool,
  label: PropTypes.string
};

export default withStyles(style)(TextsEditor);
