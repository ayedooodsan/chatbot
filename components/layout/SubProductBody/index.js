import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Scrollbar from 'react-scrollbars-custom';

import style from './style';

const SubProductBody = props => {
  const {
    classes,
    generateForm,
    onChangeValues,
    onDeleteValue,
    title,
    values
  } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.subProduct} evaluation={1}>
        <div className={classes.header}>
          <Typography variant="subtitle1">{title}</Typography>
          <Divider />
        </div>
        <div className={classes.body}>
          <Scrollbar contentProps={{ style: { width: '100%' } }}>
            <div className={classes.inScrollbar}>
              {values.map((value, index) => (
                <div key={JSON.stringify(value)}>
                  {generateForm(
                    value,
                    (newValue, key) => {
                      onChangeValues(newValue, index, key);
                    },
                    callback => {
                      onDeleteValue(index, callback);
                    }
                  )}
                </div>
              ))}
            </div>
          </Scrollbar>
        </div>
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
  title: PropTypes.string.isRequired,
  values: PropTypes.array
};

export default withStyles(style)(SubProductBody);
