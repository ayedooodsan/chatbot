import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Draft, { RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import CodeUtils from 'draft-js-code';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import BlockNumber from './BlockNumber';
import { setAsCodeBlock } from './editorStateFn';
import style from './style';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new PrismDecorator({
      prism: Prism,
      defaultSyntax: 'javascript'
    });

    const contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: '{\n  attribute: "value"\n}'
        }
      ]
    });

    this.editor = React.createRef();

    this.state = {
      focus: false,
      editorState: Draft.EditorState.createWithContent(contentState, decorator)
    };
  }

  componentDidUpdate() {
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
  }

  blockRendererFn = () => ({
    component: BlockNumber
  });

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(setAsCodeBlock(newState));
      return 'handled';
    }
    return 'not-handled';
  };

  keyBindingFn = evt => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState))
      return Draft.getDefaultKeyBinding(evt);

    const command = CodeUtils.getKeyBinding(evt);

    return command || Draft.getDefaultKeyBinding(evt);
  };

  handleReturn = evt => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(setAsCodeBlock(CodeUtils.handleReturn(evt, editorState)));
    return 'handled';
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
    this.onChange(setAsCodeBlock(newEditorState));
    return 'handled';
  };

  onTab = evt => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(setAsCodeBlock(CodeUtils.onTab(evt, editorState)));
    return 'handled';
  };

  focusEditor = () => {
    this.editor.current.focus();
  };

  render() {
    const { classes, error } = this.props;
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
        <InputLabel
          className={classNames(classes.inputLabel, {
            [classes.focusInputLabel]: focus,
            [classes.errorInputLabel]: error
          })}
        >
          Custom Payload
        </InputLabel>
        <Draft.Editor
          ref={this.editor}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          editorState={this.state.editorState}
          onChange={this.onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          blockRendererFn={this.blockRendererFn}
          handleReturn={this.handleReturn}
          handlePastedText={this.handlePastedText}
          onTab={this.onTab}
        />
      </Paper>
    );
  }
}

CodeEditor.defaultProps = {
  error: false
};

CodeEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool
};

export default withStyles(style)(CodeEditor);
