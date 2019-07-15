import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import Bubblechat from '../../common/BubbleChat';

const BotLoading = () => {
  return (
    <Bubblechat type="self">
      <React.Fragment>
        <SyncLoader sizeUnit="px" size={10} margin="4px" color="#00a19a" />
      </React.Fragment>
    </Bubblechat>
  );
};

export default BotLoading;
