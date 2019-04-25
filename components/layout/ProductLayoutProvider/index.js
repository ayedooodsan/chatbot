import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import style from './style';

class ProductLayoutProvider extends Component {
  state = {
    title: '',
    productValues: [],
    subProductValues: []
  };

  componentDidMount() {
    const { productValues, subProductValues } = this.props;
    this.setState({
      productValues: _.cloneDeep(productValues),
      subProductValues: _.cloneDeep(subProductValues),
      title: this.props.title
    });
  }

  componentDidUpdate(prevProps) {
    const { title, productValues, subProductValues } = this.props;
    const isTitleEqual = _.isEqual(title, prevProps.title);
    if (!isTitleEqual) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        productValues: _.cloneDeep(productValues),
        subProductValues: _.cloneDeep(subProductValues),
        title: this.props.title
      });
    }
  }

  onChangeProductValues = (value, index, key) => {
    this.setState(prevState => {
      const newValues = prevState.productValues;
      if (key === undefined) {
        newValues[index] = value;
      } else {
        newValues[index][key] = value;
      }
      return { productValues: newValues };
    });
  };

  onDeleteProductValue = index => {
    this.setState(prevState => {
      const newValues = prevState.productValues;
      newValues.splice(index, 1);
      return { productValues: newValues };
    });
  };

  onAddProductValue = initialValue => {
    this.setState(prevState => {
      const newValues = prevState.productValues;
      newValues.push(initialValue);
      return newValues;
    });
  };

  onChangeSubProductValues = (value, index, key) => {
    this.setState(prevState => {
      const newValues = prevState.subProductValues;
      if (key === undefined) {
        newValues[index] = value;
      } else {
        newValues[index][key] = value;
      }
      return { subProductValues: newValues };
    });
  };

  onDeleteSubProductValue = index => {
    this.setState(prevState => {
      const newValues = prevState.subProductValues;
      newValues.splice(index, 1);
      return { subProductValues: newValues };
    });
  };

  onAddSubProductValue = initialValue => {
    this.setState(prevState => {
      const newValues = prevState.subProductValues;
      newValues.push(initialValue);
      return newValues;
    });
  };

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  getProduct = (productFilter, subProductFilter) => {
    const { title, productValues, subProductValues } = this.state;
    return {
      title,
      productValues: productFilter
        ? productValues.filter(productFilter)
        : productValues,
      subProductValues: subProductFilter
        ? subProductValues.filter(subProductFilter)
        : subProductValues
    };
  };

  render() {
    const { header, product, subProduct, classes } = this.props;
    const { title, productValues, subProductValues } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {header(this.onChangeTitle, title, this.getProduct)}
        </div>
        <div className={classes.body}>
          <div className={classes.product}>
            {product(
              productValues,
              this.onChangeProductValues,
              this.onAddProductValue,
              this.onDeleteProductValue
            )}
          </div>
          {subProductValues.length !== 0 && (
            <div className={classes.subProduct}>
              {subProduct(
                subProductValues,
                this.onChangeSubProductValues,
                this.onAddSubProductValue,
                this.onDeleteSubProductValue
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ProductLayoutProvider.defaultProps = {
  productValues: [],
  subProductValues: [],
  subProduct: () => null,
  title: '',
  id: null
};

ProductLayoutProvider.propTypes = {
  header: PropTypes.func.isRequired,
  product: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  productValues: PropTypes.array,
  subProductValues: PropTypes.array,
  subProduct: PropTypes.func
};

export default withStyles(style)(ProductLayoutProvider);
