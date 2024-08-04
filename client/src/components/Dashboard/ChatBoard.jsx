import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useIsLoggedIn from '../../hook/useIsLoggedIn';
import useMessage from '../../hook/useMessage';
import socket from '../../socket';

import ChatInterface from '../Chat/ChatInterface';
import ChatInput from '../Chat/ChatInput';

const ChatBoard = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') || null;
  const { currentUser } = useIsLoggedIn();
  const {messages, handleSendMessage} = useMessage({ roomId, currentUser, senderIsAdmin: true });

  useEffect(() => {
    socket.emit('join-chat', roomId);

    return () => socket.emit('leave-chat', roomId);
  }, [roomId]);

  return (
    <>
      {/* Click ngoài ChatPopup sẽ hide */}
      <div className="flex h-full min-h-full flex-col rounded-lg bg-white [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-zinc-300 [&>*]:px-6 [&>*]:py-4">
        <ChatInterface messages={messages} />
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </>
  );
};
export default ChatBoard;
