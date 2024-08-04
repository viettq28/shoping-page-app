import { useEffect } from 'react';
import useMessage from '../../hook/useMessage';
import socket from '../../socket';

import ChatHeader from './ChatHeader';
import ChatInterface from './ChatInterface';
import ChatInput from './ChatInput';

const ChatPopup = ({ handleHidePop, currentUser, roomId }) => {
  const { messages, handleSendMessage } = useMessage({
    roomId,
    currentUser,
    senderIsAdmin: false,
  });
  useEffect(() => () => {
    socket.emit('join-chat', roomId);

    return () => socket.emit('leave-chat', roomId);
  });

  return (
    <>
      {/* Click ngoài ChatPopup sẽ hide */}
      <div className="fixed inset-0" onClick={handleHidePop}></div>
      <div className="fixed left-1/2 top-1/2 flex !origin-center -translate-x-1/2 -translate-y-1/2 animate-shaking-popup flex-col rounded-lg bg-white shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] lg:h-3/4 lg:w-1/3 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-zinc-300 [&>*]:px-6 [&>*]:py-4">
        <ChatHeader />
        <ChatInterface messages={messages} />
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </>
  );
};
export default ChatPopup;
