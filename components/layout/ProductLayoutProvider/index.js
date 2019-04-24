import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import style from './style';

class ProductLayoutProvider extends Component {
  state = {
    title: '',
    values: []
  };

  componentDidMount() {
    this.setState({
      values: this.props.values,
      title: this.props.title
    });
  }

  componentDidUpdate(prevProps) {
    const { title, values } = this.props;
    const isTitleEqual = _.isEqual(title, prevProps.title);
    const isValuesEqual = _.isEqual(values, prevProps.values);
    if (!isTitleEqual || !isValuesEqual) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        values: this.props.values,
        title: this.props.title
      });
    }
  }

  onChangeValues = (value, index, key) => {
    this.setState(prevState => {
      const newValues = prevState.values;
      if (key === undefined) {
        newValues[index] = value;
      } else {
        newValues[index][key] = value;
      }
      return { values: newValues };
    });
  };

  onDeleteValue = index => {
    this.setState(prevState => {
      const newValues = prevState.values;
      newValues.splice(index, 1);
      return { values: newValues };
    });
  };

  onAddValue = initialValue => {
    this.setState(prevState => {
      const newValues = prevState.values;
      newValues.push(initialValue);
      return newValues;
    });
  };

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  getProduct = () => {
    return {
      title: this.state.title,
      values: this.state.values.filter(value => value !== '')
    };
  };

  render() {
    const { header, body, classes } = this.props;
    const { title, values } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {header(this.onChangeTitle, title, this.getProduct)}
        </div>
        <div className={classes.body}>
          {body(
            values,
            this.onChangeValues,
            this.onAddValue,
            this.onDeleteValue
          )}
        </div>
      </div>
    );
  }
}

ProductLayoutProvider.defaultProps = {
  values: [],
  title: '',
  id: null
};

ProductLayoutProvider.propTypes = {
  header: PropTypes.func.isRequired,
  body: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  values: PropTypes.array,
  title: PropTypes.string
};

export default withStyles(style)(ProductLayoutProvider);
