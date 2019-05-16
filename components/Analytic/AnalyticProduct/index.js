import React from 'react';
import SimpleProductLayoutProvider from '../../layout/SimpleProductLayoutProvider';
import SimpleProductHead from '../../layout/SimpleProductHead';
import SimpleProductBody from '../../layout/SimpleProductBody';

import DialogAnalytics from '../DialogAnalytics';

const AnalyticProduct = () => {
  return (
    <SimpleProductLayoutProvider
      header={() => <SimpleProductHead title="Analytics" noButton />}
      product={() => (
        <SimpleProductBody>
          <DialogAnalytics />
        </SimpleProductBody>
      )}
    />
  );
};

export default AnalyticProduct;
