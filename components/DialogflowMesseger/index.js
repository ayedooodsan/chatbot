import React from 'react';
import PropTypes from 'prop-types';

const DialogFlowMessenger = props => {
  const { title, agentId } = props;

  return (
    <>
      <style jsx>{`
        df-messenger {
          --df-messenger-button-titlebar-color: #00a19a;
        }
      `}</style>
      <df-messenger chat-title={title} agent-id={agentId} language-code="id" />
    </>
  );
};

DialogFlowMessenger.defaultProps = {
  agentId: '11f353f7-6364-4f4b-8f62-e170dfd697d8'
};

DialogFlowMessenger.propTypes = {
  title: PropTypes.string.isRequired,
  agentId: PropTypes.string
};

export default DialogFlowMessenger;
