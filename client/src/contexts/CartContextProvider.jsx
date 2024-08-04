import { createContext, useState, useEffect } from 'react';
import useIsLoggedIn from '../hook/useIsLoggedIn';

const CartContext = createContext([]);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useIsLoggedIn();

  useEffect(() => {
    const baseCart = currentUser?.cart || [];
    setCart(baseCart);
    
  }, [currentUser]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
