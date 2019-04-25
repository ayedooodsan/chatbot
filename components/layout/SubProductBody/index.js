import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Scrollbar from 'react-scrollbars-custom';

import style from './style';

const SubProductBody = props => {
  const {
    classes,
    generateForm,
    onChangeValues,
    onDeleteValue,
    values
  } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.formList} evaluation={1}>
        <Scrollbar>
          <div className={classes.inScrollbar}>
            {values.map((value, index) => (
              <div key={JSON.stringify(value)}>
                {generateForm(
                  value,
                  (newValue, key) => {
                    onChangeValues(newValue, index, key);
                  },
                  () => {
                    onDeleteValue(index);
                  }
                )}
              </div>
            ))}
          </div>
        </Scrollbar>
      </Paper>
    </div>
  );
};

SubProductBody.defaultProps = {
  values: []
};

SubProductBody.propTypes = {
  classes: PropTypes.object.isRequired,
  generateForm: PropTypes.func.isRequired,
  addFormList: PropTypes.func.isRequired,
  onChangeValues: PropTypes.func.isRequired,
  onDeleteValue: PropTypes.func.isRequired,
  values: PropTypes.array
};

export default withStyles(style)(SubProductBody);
