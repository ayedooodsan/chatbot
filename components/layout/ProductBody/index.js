import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Scrollbar from 'react-scrollbars-custom';

import style from './style';

const ProductBody = props => {
  const { classes, generateFormList, addFormList } = props;

  return (
    <div className={classes.root}>
      <div className={classes.formList}>
        <Scrollbar>
          <div className={classes.inScrollbar}>
            {generateFormList()}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addFormList}
            >
              ADD EXAMPLE
            </Button>
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

ProductBody.propTypes = {
  classes: PropTypes.object.isRequired,
  generateFormList: PropTypes.func.isRequired,
  addFormList: PropTypes.func.isRequired
};

export default withStyles(style)(ProductBody);
