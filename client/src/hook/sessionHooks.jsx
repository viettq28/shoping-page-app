import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import ServerContext from '../contexts/SeverContextProvider';

export function useSessions() {
  const serverHost = useContext(ServerContext);
  const {
    data: sessions,
    isPending,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const result = await fetch(`${serverHost}/api/v1/sessions`, {
        credentials: 'include',
      });
      return await result.json();
    },
    queryKey: ['sessions'],
    select: (data) => (data?.data ? data.data : []),
  });


  return { sessions, isPending, isFetching };
}

export function useSession(sessionId) {
  const serverHost = useContext(ServerContext);
  const {
    data: session,
    isPending,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const result = await fetch(`${serverHost}/api/v1/sessions/${sessionId}`, {
        credentials: 'include',
      });
      return await result.json();
    },
    queryKey: ['session', sessionId],
    enabled: !!sessionId,
    select: (data) => (data?.data ? data.data : []),
  });


  return { session, isPending, isFetching };
}
