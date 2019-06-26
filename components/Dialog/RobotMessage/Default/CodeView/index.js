import React from 'react';
import PropTypes from 'prop-types';
import Draft, { convertFromRaw } from 'draft-js';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';

class CodeView extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;

    const decorator = new PrismDecorator({
      prism: Prism,
      defaultSyntax: 'javascript'
    });

    const contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: value
        }
      ]
    });

    this.state = {
      editorState: Draft.EditorState.createWithContent(contentState, decorator)
    };
  }

  render() {
    return (
      <Draft.Editor
        readOnly
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    );
  }
}

CodeView.propTypes = {
  value: PropTypes.string.isRequired
};

export default CodeView;
