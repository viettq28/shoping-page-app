import { useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CartContext from '../contexts/CartContextProvider';
import ServerContext from '../contexts/SeverContextProvider';

const useIsLoggedIn = () => {
  const queryClient = useQueryClient();
  const serverHost = useContext(ServerContext);
  const { renderCart } = useContext(CartContext);
  const {
    data: currentUser,
    isError,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const result = await fetch(
        `${serverHost}/api/v1/users/isLoggedIn`,
        {
          credentials: import.meta.env.DEV ? 'include' : 'same-origin',
        }
      );
      return await result.json();
    },
    queryKey: ['login'],
    staleTime: Infinity,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (isError) {
      queryClient.setQueryData(['login'], {});
    }
  }, [isError, queryClient, currentUser, renderCart]);
  return { currentUser, isFetching };
};
export default useIsLoggedIn;
