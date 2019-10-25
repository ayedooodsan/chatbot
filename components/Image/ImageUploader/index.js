/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Close from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import connect from './store';
import style from './style';

const ImageUploader = props => {
  const { createImage, classes, projectId } = props;
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [loading, setLoading] = useState(false);
  const onChangeImage = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    if (validity.valid) {
      setImage(file);
      if (file) {
        setImageName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onClose = () => {
    document.getElementById('imageForm').reset();
    setImage(null);
    setImageUrl(null);
    setImageName(null);
  };

  const onUpload = () => {
    setLoading(true);
    createImage({
      projectId,
      name: imageName,
      file: image
    })
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form id="imageForm" className={classes.root}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="uploadImage"
        onChange={onChangeImage}
        type="file"
      />
      {imageUrl && !loading && (
        <React.Fragment>
          <Fab
            onClick={onClose}
            className={classes.onClose}
            size="small"
            color="primary"
          >
            <Close />
          </Fab>
          <Paper className={classes.fieldContainer} elevation={0}>
            <InputBase
              placeholder="Name"
              margin="dense"
              value={imageName}
              onChange={event => setImageName(event.target.value)}
              fullWidth
              className={classes.fileNameField}
            />
            <Button color="primary" size="small" onClick={onUpload}>
              Upload
            </Button>
          </Paper>
        </React.Fragment>
      )}
      <ButtonBase
        focusRipple
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
      >
        {imageUrl && (
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${imageUrl})`
            }}
          />
        )}
        <React.Fragment>
          <span className={classes.imageBackdrop} />
          <label htmlFor="uploadImage" className={classes.imageButton}>
            <Typography
              component="div"
              variant="button"
              color="inherit"
              className={classes.imageTitle}
            >
              {loading && <CircularProgress />}
              {!loading && (
                <Paper className={classes.textMessage} elevation={0}>
                  {!imageUrl ? 'Add Image' : 'Change Image'}
                </Paper>
              )}
            </Typography>
          </label>
        </React.Fragment>
      </ButtonBase>
    </form>
  );
};

ImageUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  createImage: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired
};

export default withStyles(style)(connect(ImageUploader));
