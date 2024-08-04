import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import ServerContext from '../contexts/SeverContextProvider';

export const useProducts = () => {
  const serverHost = useContext(ServerContext);
  const {
    data: products,
    isPending,
    isFetching,
    error
  } = useQuery({
    queryFn: async () => {
      const url = `${serverHost}/api/v1/products`;
      const result = await fetch(url, {
        credentials: import.meta.env.DEV ? 'include' : 'same-origin',
      });
      return await result.json();
    },
    queryKey: ['products'],
    staleTime: Infinity,
    select: (data) => (data?.data ? data.data : []),
  });
  return { products, isPending, isFetching, error };
}

export const useMutateProducts = () => {
  const queryClient = useQueryClient();
  const serverHost = useContext(ServerContext);
  const { data: mutatedProduct, mutateAsync } = useMutation({
    mutationFn: async ({ productId, options }) => {
      let url = `${serverHost}/api/v1/products/${
        productId || ''
      }`;
      options.credentials = import.meta.env.DEV ? 'include' : 'same-origin';
      return await fetch(url, options);
    },
    onSuccess: () => {
      queryClient.refetchQueries(['products']);
    },
  });

  return { mutateAsync, mutatedProduct };
}

export default useProducts;
