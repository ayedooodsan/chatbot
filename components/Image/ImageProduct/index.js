import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Pagination from 'material-ui-flat-pagination';
import withStyles from '@material-ui/core/styles/withStyles';
import DeleteProductDialog from '../../common/DeleteProductDialog';
import ImageField from '../ImageField';
import ImageProvider from '../MyImages';
import ImageUploader from '../ImageUploader';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';
import style from './style';
import connect from './store';

const ImageProduct = props => {
  const [pagination, setPagination] = useState({
    limit: 11,
    offset: 0
  });
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const { deleteImage, projectId, classes } = props;
  const confirmDelete = () => {
    deleteImage({ id: selectedImage.id }).then(() => {
      setOpen(false);
    });
  };
  const onDeleteImage = image => {
    setOpen(true);
    setSelectedImage(image);
  };
  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Images" noButton />}
      product={() => (
        <SimpleProductBody>
          <div>
            <DeleteProductDialog
              open={open}
              handleClose={() => setOpen(false)}
              handleConfirm={confirmDelete}
              message={`Delete ${selectedImage.name} Image`}
              subMessage={`To delete this image, please enter "DELETE".`}
              productName={selectedImage.name}
            />
            <ImageProvider
              offset={pagination.offset}
              limit={pagination.limit}
              projectId={projectId}
              keyword={null}
            >
              {(imageProvider, loading) => (
                <React.Fragment>
                  {imageProvider &&
                    pagination.limit < imageProvider.pageInfo.total && (
                      <Pagination
                        className={classes.pagination}
                        limit={pagination.limit}
                        offset={pagination.offset}
                        total={
                          loading || !imageProvider
                            ? 0
                            : imageProvider.pageInfo.total
                        }
                        centerRipple
                        innerButtonCount={1}
                        outerButtonCount={1}
                        onClick={(e, offset) =>
                          setPagination({ ...pagination, offset })
                        }
                      />
                    )}
                  <Grid container spacing={16}>
                    <Grid item md={2}>
                      <ImageUploader projectId={projectId} />
                    </Grid>
                    {imageProvider &&
                      imageProvider.images.map(image => (
                        <Grid item md={2} key={image.name}>
                          <ImageField image={image} onDelete={onDeleteImage} />
                        </Grid>
                      ))}
                  </Grid>
                </React.Fragment>
              )}
            </ImageProvider>
          </div>
        </SimpleProductBody>
      )}
    />
  );
};

ImageProduct.propTypes = {
  projectId: PropTypes.string.isRequired,
  deleteImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(connect(ImageProduct));
