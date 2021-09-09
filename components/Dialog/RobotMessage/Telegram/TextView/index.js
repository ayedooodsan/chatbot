import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const TextView = props => {
  const { value: values, classes } = props;
  if (values.length === 1) {
    return (
      <React.Fragment>
        {values[0].split(/(\r\n|\r|\n)/gm).map(chunk => (
          <Typography
            variant="caption"
            key={new Date().getTime() + Math.random()}
          >
            {chunk}
          </Typography>
        ))}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Typography variant="caption">Bot Response Variant: </Typography>
      <ul className={classes.values}>
        {values.map(value => (
          <li key={value}>
            {value.split(/(\r\n|\r|\n)/gm).map(chunk => (
              <Typography
                variant="caption"
                key={new Date().getTime() + Math.random()}
              >
                {chunk}
              </Typography>
            ))}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

TextView.propTypes = {
  value: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(TextView);
