import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <strong>{message.sender.name}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;