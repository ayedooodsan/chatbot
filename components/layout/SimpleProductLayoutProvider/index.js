import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const SimpleProductLayoutProvider = props => {
  const { classes, header, product, onSave } = props;
  return (
    <form
      className={classes.root}
      onSubmit={onSave}
      id="SimpleProductLayoutProvider"
    >
      <div className={classes.header}>{header()}</div>
      <div className={classes.body}>
        <div className={classes.product}>{product()}</div>
      </div>
    </form>
  );
};

SimpleProductLayoutProvider.defaultProps = {
  onSave: null
};

SimpleProductLayoutProvider.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

export default withStyles(style)(SimpleProductLayoutProvider);
