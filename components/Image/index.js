import React from 'react';
import PropTypes from 'prop-types';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import ImageProduct from './ImageProduct';

const Image = props => {
  const { projectId } = props;
  return (
    <LayoutProvider navigation={() => <Navigation />}>
      <ImageProduct projectId={projectId} />
    </LayoutProvider>
  );
};

Image.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default Image;
