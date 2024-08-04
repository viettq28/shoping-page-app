import { useContext, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import CartContext from '../../contexts/CartContextProvider';
import ServerContext from '../../contexts/SeverContextProvider';
import useHttp from '../../hook/useHttp';

import CartBoard from './CartBoard';
import CartTotal from './CartTotal';

// Phần thân trang, render CardBoard và CartTotal
const CartBody = () => {
  const { cart, setCart } = useContext(CartContext);
  const serverHost = useContext(ServerContext);
  const queryClient = useQueryClient();
  const { sendRequest } = useHttp();

  const handler = useCallback(
    (id) => {
      return {
        handleIncrement: (e) => {
          e.preventDefault();
          setCart(
            cart.map((item) => {
              if (item.product._id === id) {
                item.quantity++;
              }
              return item;
            })
          );
        },
        handleDecrement: (e) => {
          e.preventDefault();
          setCart(
            cart.map((item) => {
              if (item.product._id === id) {
                item.quantity--;
              }
              return item;
            })
          );
        },
        handleDeletion: () => {
          const url = `${serverHost}/api/v1/users/cart/${id}`;
          const applyData = () => {
            setCart(cart.filter((item) => item.product._id !== id));
          };
          const handleError = () => {
            queryClient.invalidateQueries(['login']);
          };

          sendRequest(url, { method: 'DELETE' }, applyData, handleError);
        },
      };
    },
    [cart, setCart, sendRequest, queryClient, serverHost]
  );

  return (
    <div className="my-6 gap-6 tracking-widest">
      <p className="my-4 text-xl font-medium">SHOPPING CART</p>
      <div className="flex gap-5">
        <CartBoard cart={cart} handler={handler} />
        <CartTotal cart={cart} />
      </div>
    </div>
  );
};
export default CartBody;
