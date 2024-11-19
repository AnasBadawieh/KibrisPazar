import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../redux/actions/messageActions';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import socket from '../socket';

const MessagingPage = ({ match }) => {
  const dispatch = useDispatch();
  const userId = match.params.userId;

  const messageList = useSelector((state) => state.messageList);
  const { messages } = messageList;

  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    dispatch(getMessages(userId));

    socket.emit('join', { userId });

    socket.on('message', (message) => {
      setNewMessage(message);
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch, userId]);

  useEffect(() => {
    if (newMessage) {
      dispatch({ type: 'MESSAGE_LIST_SUCCESS', payload: [...messages, newMessage] });
    }
  }, [newMessage, dispatch, messages]);

  const sendHandler = (content) => {
    const message = { receiver: userId, content };
    dispatch(sendMessage(message));
    socket.emit('sendMessage', message);
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageForm onSend={sendHandler} />
    </div>
  );
};

export default MessagingPage;