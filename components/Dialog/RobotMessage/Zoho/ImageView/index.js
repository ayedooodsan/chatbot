import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';

const ImageView = props => {
  const { value, classes } = props;
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={value.image} title="Image" />
      {value.text && value.text !== '' && (
        <CardContent>
          <Typography component="p">{value.text}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

ImageView.propTypes = {
  value: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Style)(ImageView);
