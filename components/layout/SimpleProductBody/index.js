import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Scrollbar from 'react-scrollbars-custom';

import style from './style';

const SimpleProductBody = props => {
  const { children, classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Scrollbar contentProps={{ style: { width: '100%' } }}>
          <div className={classes.inScrollbar}>{children}</div>
        </Scrollbar>
      </div>
    </div>
  );
};

SimpleProductBody.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(style)(SimpleProductBody);
