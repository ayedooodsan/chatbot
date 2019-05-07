import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Scrollbar from 'react-scrollbars-custom';

import style from './style';

const ProductBody = props => {
  const {
    noAdd,
    classes,
    generateForm,
    generateAction,
    onChangeValues,
    onDeleteValue,
    addFormList,
    values
  } = props;
  return (
    <div className={classes.root}>
      {values.length > 0 && generateAction && (
        <div className={classes.inScrollbar}>
          <div className={classes.buttonContainer}>{generateAction()}</div>
        </div>
      )}
      <div className={classes.formList}>
        <Scrollbar>
          <div className={classes.inScrollbar}>
            {values.map((value, index) => (
              <div key={JSON.stringify(value)}>
                {generateForm(
                  value,
                  (newValue, key, callback) => {
                    onChangeValues(newValue, index, key, callback);
                  },
                  callback => {
                    onDeleteValue(index, callback);
                  },
                  index
                )}
              </div>
            ))}
            {!noAdd && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={addFormList}
              >
                ADD EXAMPLE
              </Button>
            )}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

ProductBody.defaultProps = {
  values: [],
  noAdd: false,
  generateAction: null
};

ProductBody.propTypes = {
  classes: PropTypes.object.isRequired,
  generateForm: PropTypes.func.isRequired,
  addFormList: PropTypes.func.isRequired,
  onChangeValues: PropTypes.func.isRequired,
  onDeleteValue: PropTypes.func.isRequired,
  generateAction: PropTypes.func,
  noAdd: PropTypes.bool,
  values: PropTypes.array
};

export default withStyles(style)(ProductBody);
