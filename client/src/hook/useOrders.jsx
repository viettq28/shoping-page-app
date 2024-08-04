import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import ServerContext from '../contexts/SeverContextProvider';
import useIsLoggedIn from './useIsLoggedIn';

export const useOrders = () => {
  const serverHost = useContext(ServerContext);
  const {
    data: orders,
    isPending,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const result = await fetch(`${serverHost}/api/v1/orders`, {
        credentials: 'include',
      });
      return await result.json();
    },
    queryKey: ['orders'],
    staleTime: Infinity,
    select: (data) => (data?.data ? data.data : []),
  });

  return { orders, isPending, isFetching };
}

export const useCurrentUserOrders = () => {
  const serverHost = useContext(ServerContext);
  const { currentUser } = useIsLoggedIn();
  const {
    data: orders,
    isPending,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const result = await fetch(`${serverHost}/api/v1/orders/${currentUser._id}`, {
        credentials: 'include',
      });
      return await result.json();
    },
    queryKey: ['orders', currentUser._id],
    staleTime: Infinity,
    select: (data) => (data?.data ? data.data : []),
  });

  return { orders, isPending, isFetching };
}

export const useMutateOrder = () => {
  const serverHost = useContext(ServerContext);
  const queryClient = useQueryClient();
  const { data: mutatedOrders, mutateAsync } = useMutation({
    mutationFn: async (body) => {
      let url = `${serverHost}/api/v1/orders/`;
      
      return await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries(['orders']);
    },
  });

  return { mutateAsync, mutatedOrders };
}

