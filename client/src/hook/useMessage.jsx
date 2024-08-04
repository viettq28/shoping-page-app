import { useState, useEffect, useCallback } from 'react';
import { useSession } from './sessionHooks';
import socket from '../socket';

const getSender = (data, senderIsAdmin) => {
  if (
    (senderIsAdmin && data[0].startsWith('admin')) ||
    (!senderIsAdmin && !data[0].startsWith('admin'))
  ) {
    return ['u-' + data[0], data[1]];
  }
  return data;
};



const useMessage = ({ roomId, currentUser, senderIsAdmin }) => {
  const [messages, setMessages] = useState([]);
  const { session, isFetching } = useSession(roomId);

  const handleSendMessage = useCallback((msg, setMsg) => {
    socket.emit(`${senderIsAdmin ? 'admin' : 'user'}-message`, {
      user: currentUser,
      roomId,
      msgContent: msg,
    });
    setMsg('');
  }, [currentUser, roomId, senderIsAdmin]);

  useEffect(() => {
    if (!isFetching) {
      const msgs =
        session?.messages.map((msg) => getSender(msg, senderIsAdmin)) || [];
      setMessages(msgs);
    }
  }, [isFetching, session, senderIsAdmin]);

  useEffect(() => {
    const setNewMessages = (data) => {
      setMessages(prev => [...prev, getSender(data, senderIsAdmin)]);
    }
    socket.on('message', setNewMessages);

    return () => socket.off('message', setNewMessages);
  }, [senderIsAdmin]);

  return {messages, setMessages, handleSendMessage};
};

export default useMessage;
