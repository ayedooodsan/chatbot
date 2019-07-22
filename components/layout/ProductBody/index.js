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
    topMenu,
    onChangeValues,
    onDeleteValue,
    addFormList,
    buttonText,
    values
  } = props;
  return (
    <div className={classes.root}>
      {values.length > 0 && topMenu && (
        <div className={classes.inScrollbar}>{topMenu()}</div>
      )}
      <div className={classes.formList}>
        <Scrollbar contentProps={{ style: { width: '100%' } }}>
          <div className={classes.inScrollbar}>
            {values.map((value, index) => (
              <div key={value.key}>
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
                {buttonText || 'ADD EXAMPLE'}
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
  topMenu: null,
  buttonText: null
};

ProductBody.propTypes = {
  classes: PropTypes.object.isRequired,
  generateForm: PropTypes.func.isRequired,
  addFormList: PropTypes.func.isRequired,
  onChangeValues: PropTypes.func.isRequired,
  onDeleteValue: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  topMenu: PropTypes.func,
  noAdd: PropTypes.bool,
  values: PropTypes.array
};

export default withStyles(style)(ProductBody);
