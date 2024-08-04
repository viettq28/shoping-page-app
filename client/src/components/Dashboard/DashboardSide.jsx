import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSessions } from '../../hook/sessionHooks';
import useIsLoggedIn from '../../hook/useIsLoggedIn';
import socket from '../../socket';

const DashboardSide = ({ className, isChatting }) => {
  const { currentUser } = useIsLoggedIn();
  const { sessions, isFetching } = useSessions();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') || null;
  const queryClient = useQueryClient();

  useEffect(() => {
    const setNewSession = (data) => {
      queryClient.setQueryData(['sessions'], (prev) => {
        if (prev.data) {
          if (
            !prev.data.length ||
            prev.data[prev.data.length - 1].creator !== data.creator
          ) {
            return { ...prev, data: [...prev.data, data] };
          }
        }
      });
    };
    socket.on('new-chat-room', setNewSession);
    return () => socket.off('new-chat-room', setNewSession);
  }, [queryClient]);

  const handleLeaveRoom = (e) => {
    const li = e.target.closest('li');
    if (li && roomId) {
      if (li.id !== roomId) {
        socket.emit('leave-chat', roomId);
      }
    }
  };

  return (
    <div
      className={`[&_li]:mt-[0.5em] [&_li]:p-[2px] [&_li]:ps-[0.5em] [&_li]:text-black [&_p]:mt-[0.5em] [&_p]:p-[2px] [&_p]:text-[1.1em] ${className}`}
      onClick={handleLeaveRoom}
    >
      <ul className="[&_li]:text-[0.8em]">
        {(currentUser && currentUser.role === 'admin') && (
          <>
            <Link to={'/dashboard/products'}>
              <li>Products</li>
            </Link>
            <Link to={'/dashboard/history'}>
              <li>History</li>
            </Link>
          </>
        )}
        <Link to={'/dashboard/chat'}>
          <li>Chat</li>
        </Link>
      </ul>
      {isChatting ? (
        <ul className="m-auto w-3/4 break-words bg-slate-100 [&_li]:text-[0.7em] [&_li]:text-black">
          {!isFetching && (
            <>
              {sessions.map((session) => (
                <Link key={session._id} to={`?roomId=${session._id}`}>
                  <li id={session._id}>{session._id}</li>
                </Link>
              ))}
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
};
export default DashboardSide;
