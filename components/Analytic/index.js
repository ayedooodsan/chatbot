import React from 'react';
import PropTypes from 'prop-types';
import LayoutProvider from '../layout/LayoutProvider';
import Navigation from '../layout/Navigation';
import AnalyticProduct from './AnalyticProduct';

const Analytic = props => {
  const { projectId } = props;
  return (
    <LayoutProvider navigation={() => <Navigation />}>
      <AnalyticProduct projectId={projectId} />
    </LayoutProvider>
  );
};

Analytic.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default Analytic;
