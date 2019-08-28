import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';

const ButtonView = props => {
  const { value, classes } = props;
  return (
    <React.Fragment>
      <Typography component="p" variant="caption">
        {value.text}
      </Typography>
      <Card className={classes.card}>
        {value.buttons.map(button => (
          <React.Fragment key={button.title}>
            <Divider />
            <CardActionArea
              component={({ children, ...otherProps }) => (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a href={button.value} target="_blank" {...otherProps}>
                  {children}
                </a>
              )}
            >
              <CardContent className={classes.cardContent}>
                <Typography component="p" variant="caption" color="primary">
                  {button.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </React.Fragment>
        ))}
      </Card>
    </React.Fragment>
  );
};

ButtonView.propTypes = {
  value: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(ButtonView);
