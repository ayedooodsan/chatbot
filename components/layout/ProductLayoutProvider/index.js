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
      productValues: productValues.map(productValue => ({
        key: productValue.id || new Date().getTime() + Math.random(),
        ...productValue
      })),
      subProductValues: subProductValues.map(subProductValue => ({
        key: subProductValue.id || new Date().getTime() + Math.random(),
        ...subProductValue
      })),
      title: this.props.title
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isTitlePropsEqual = _.isEqual(nextProps.title, this.props.title);
    const isTitleStateEqual = _.isEqual(nextState.title, this.state.title);
    const isProductValuesEqual =
      nextState.productValues.length === this.state.productValues.length;
    const isSubProductEqual = _.isEqual(
      nextState.subProductValues,
      this.state.subProductValues
    );
    const isFilterConditionEqual = _.isEqual(
      nextProps.filterCondition,
      this.props.filterCondition
    );
    if (nextState.updateView) {
      return true;
    }
    if (
      isTitlePropsEqual &&
      isTitleStateEqual &&
      isProductValuesEqual &&
      isFilterConditionEqual &&
      isSubProductEqual
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const { title, productValues, subProductValues } = this.props;
    const isTitleEqual = _.isEqual(title, prevProps.title);
    if (!isTitleEqual) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        productValues: productValues.map(productValue => ({
          key: productValue.id || new Date().getTime() + Math.random(),
          ...productValue
        })),
        subProductValues: subProductValues.map(subProductValue => ({
          key: subProductValue.id || new Date().getTime() + Math.random(),
          ...subProductValue
        })),
        title: this.props.title
      });
    } else if (this.state.updateView) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ updateView: false });
    }
  }

  onChangeProductValues = (value, index, key, callback) => {
    this.setState(prevState => {
      const newValues = prevState.productValues;
      if (key === undefined || key === null) {
        newValues[index] = value;
      } else {
        newValues[index][key] = value;
      }
      return { productValues: newValues };
    }, callback);
  };

  onDeleteProductValue = (index, callback) => {
    this.setState(
      prevState => {
        const newValues = [...prevState.productValues];
        newValues.splice(index, 1);
        return { productValues: newValues };
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  };

  onAddProductValue = initialValue => {
    this.setState(prevState => {
      const newValues = [...prevState.productValues];
      newValues.push({
        key: initialValue.id || new Date().getTime() + Math.random(),
        ...initialValue
      });
      return { productValues: newValues };
    });
  };

  onChangeSubProductValues = (value, index, key) => {
    this.setState(prevState => {
      const newValues = [...prevState.subProductValues];
      if (key === undefined) {
        newValues[index] = value;
      } else {
        newValues[index][key] = value;
      }
      return { subProductValues: newValues };
    });
  };

  onDeleteSubProductValue = (index, callback) => {
    this.setState(
      prevState => {
        const newValues = [...prevState.subProductValues];
        newValues.splice(index, 1);
        return { subProductValues: newValues };
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  };

  onAddSubProductValue = initialValue => {
    this.setState(prevState => {
      const newValues = prevState.subProductValues;
      newValues.push({
        key: initialValue.id || new Date().getTime() + Math.random(),
        ...initialValue
      });
      return { subProductValues: newValues };
    });
  };

  onChangeTitle = event => {
    this.setState({
      title: event.target.value.replace(/[^a-zA-Z\d\s-_]/, '')
    });
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

  updateSubProductFromProduct = createNewSubProduct => {
    this.setState(prevState => {
      const { subProductValues, productValues } = prevState;
      const newSubProductValues = createNewSubProduct(
        productValues,
        subProductValues
      );
      return { subProductValues: newSubProductValues };
    });
  };

  updateProductFromSubProduct = createNewProduct => {
    this.setState(prevState => {
      const { subProductValues, productValues } = prevState;
      const newProductValues = createNewProduct(
        productValues,
        subProductValues
      );
      return { productValues: newProductValues, updateView: true };
    });
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
              this.onDeleteProductValue,
              this.updateSubProductFromProduct,
              subProductValues,
              this.getProduct
            )}
          </div>
          {subProductValues.length !== 0 && subProduct && (
            <div className={classes.subProduct}>
              {subProduct(
                subProductValues,
                this.onChangeSubProductValues,
                this.onAddSubProductValue,
                this.onDeleteSubProductValue,
                this.updateProductFromSubProduct
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
  subProduct: null,
  title: '',
  filterCondition: {},
  id: null
};

ProductLayoutProvider.propTypes = {
  header: PropTypes.func.isRequired,
  product: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  filterCondition: PropTypes.object,
  id: PropTypes.string,
  title: PropTypes.string,
  productValues: PropTypes.array,
  subProductValues: PropTypes.array,
  subProduct: PropTypes.func
};

export default withStyles(style)(ProductLayoutProvider);
