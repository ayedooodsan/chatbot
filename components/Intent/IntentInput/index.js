import React from 'react';
import PropTypes from 'prop-types';

import PreviewMessage from '../../PreviewMessage';
import UserSayInput from '../../UserSayInput';
import DeleteMessageDialogInput from '../../DeleteMessageDialogInput';
import { EDIT, DELETE, ADD } from './constant';

const IntentInput = props => {
  const { type, payload, send, reset } = props;
  let Element = null;
  switch (type) {
    case EDIT: {
      Element = (
        <UserSayInput
          payload={payload}
          preview={() => (
            <PreviewMessage
              title="EDIT USER SAYS:"
              subtitle={payload.message}
              reset={reset}
            />
          )}
          send={send}
          type={EDIT}
        />
      );
      break;
    }
    case DELETE: {
      Element = (
        <DeleteMessageDialogInput
          preview={() => (
            <PreviewMessage
              title="DELETE USER SAYS:"
              subtitle={payload.message}
              footTitle="Type the the first word and click the send button."
              reset={reset}
            />
          )}
          send={send}
          type={DELETE}
          payload={payload}
        />
      );
      break;
    }
    default: {
      Element = <UserSayInput send={send} type={ADD} payload={payload} />;
      break;
    }
  }
  return Element;
};

IntentInput.propTypes = {
  type: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default IntentInput;
