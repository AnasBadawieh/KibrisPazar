import React, { useState } from 'react';

const MessageForm = ({ onSend }) => {
  const [content, setContent] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    onSend(content);
    setContent('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;