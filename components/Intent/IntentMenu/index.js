import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-scrollbars-custom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';

import UserSayMessage from '../../UserSayMessage';
import IntentBar from '../IntentBar';
import IntentInput from '../IntentInput';
import style from './style';
import connect from './store';
import redirect from '../../../libraries/redirect';
import { EDIT, DELETE } from '../IntentInput/constant';

class IntentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorTitle: '',
      intentInputProps: {},
      title: '',
      values: []
    };
    this.titleInputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.intent, prevProps.intent)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        title: this.props.intent.title || '',
        values: this.props.intent.values || []
      });
      if (!this.props.intent.title) {
        this.titleInputRef.current.focus();
      }
    }
  }

  onSaveIntent = async () => {
    const { title, values } = this.state;
    const { intentId, createIntent, updateIntent, projectId } = this.props;
    if (!title) {
      this.setState({ errorTitle: 'Title is required' });
    } else if (intentId === '0') {
      const response = await createIntent({ title, values, projectId });
      const newIntentId = response.data.createIntent.id;
      redirect({}, `/${projectId}/intent/${newIntentId}`);
    } else {
      console.log({ intentId });
      updateIntent({ id: intentId, title, values });
    }
  };

  onSend = ({ value, index }) => {
    const {
      intentInputProps: { type }
    } = this.state;
    this.setState(prevState => {
      const values = [...prevState.values];
      switch (type) {
        case EDIT: {
          values[index] = value;
          break;
        }
        case DELETE: {
          values.splice(index, 1);
          break;
        }
        default: {
          values.push(value);
          break;
        }
      }
      return { values };
    }, this.onReset);
  };

  onReset = () => {
    this.setState({ intentInputProps: {} });
  };

  onChangeTitle = event => {
    if (!event.target.value) {
      this.setState({
        title: event.target.value,
        errorTitle: 'Title is required'
      });
    } else {
      this.setState({
        title: event.target.value
      });
    }
  };

  onChangeIntentInputProps = intentInputProps => {
    this.setState({ intentInputProps });
  };

  onDelete = async () => {
    const { deleteIntent, intentId } = this.props;
    const response = await deleteIntent({ id: intentId });
    return response;
  };

  render() {
    const { intentInputProps, title, errorTitle, values } = this.state;
    const { classes, projectId, intentId } = this.props;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.header}>
          <IntentBar
            projectId={projectId}
            intentId={intentId}
            value={title}
            innerRef={this.titleInputRef}
            onChange={this.onChangeTitle}
            error={errorTitle}
            onSave={this.onSaveIntent}
            onDelete={this.onDelete}
          />
        </Paper>
        <div className={classes.container}>
          <Scrollbar>
            {values &&
              values.map((example, index) => (
                <UserSayMessage
                  key={example}
                  message={example}
                  index={index}
                  onChangeIntentInput={this.onChangeIntentInputProps}
                />
              ))}
          </Scrollbar>
        </div>
        <Paper className={classes.footer}>
          <IntentInput
            {...intentInputProps}
            send={this.onSend}
            reset={this.onReset}
          />
        </Paper>
      </Paper>
    );
  }
}

IntentMenu.defaultProps = {
  intent: {}
};

IntentMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  intentId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  createIntent: PropTypes.func.isRequired,
  updateIntent: PropTypes.func.isRequired,
  deleteIntent: PropTypes.func.isRequired,
  intent: PropTypes.object
};

export default withStyles(style)(connect(IntentMenu));
