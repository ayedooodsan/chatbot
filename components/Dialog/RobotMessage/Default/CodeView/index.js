import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Draft, { convertFromRaw } from 'draft-js';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';

class CodeView extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.decorator = new PrismDecorator({
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
      editorState: Draft.EditorState.createWithContent(
        contentState,
        this.decorator
      )
    };
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.value, this.props.value)) {
      const contentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            type: 'code-block',
            text: this.props.value
          }
        ]
      });

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        editorState: Draft.EditorState.createWithContent(
          contentState,
          this.decorator
        )
      });
    }
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
