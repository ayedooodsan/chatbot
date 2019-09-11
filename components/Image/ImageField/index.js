import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Clipboard from 'react-clipboard.js';
import style from './style';
import { imageUrl } from '../../../graphql-url';

const ImageField = props => {
  const [open, setOpen] = useState(false);
  const { image, classes, onDelete } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={imageUrl + image.url}
        title={image.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          component="p"
          variant="subtitle2"
          className={classes.imageName}
        >
          {image.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Clipboard
          onSuccess={() => setOpen(true)}
          component="span"
          data-clipboard-text={imageUrl + image.url}
        >
          <Tooltip
            onClose={() => setOpen(false)}
            open={open}
            title="Copied"
            placement="right-end"
          >
            <Button size="small" color="primary">
              Copy Url
            </Button>
          </Tooltip>
        </Clipboard>
        <Button size="small" color="secondary" onClick={() => onDelete(image)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

ImageField.propTypes = {
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

export default withStyles(style)(ImageField);
