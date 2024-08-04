import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ServerContext from '../contexts/SeverContextProvider';
import CartContext from '../contexts/CartContextProvider';
import useHttp from '../hook/useHttp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faUser,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

const MainNavigation = ({ currentUser }) => {
  const queryClient = useQueryClient();
  const { cart } = useContext(CartContext);
  const serverHost = useContext(ServerContext);
  const { sendRequest } = useHttp();
  // state transition để transit cart icon mỗi khi số lượng hàng trong cart thay đổi
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();
  // Lấy curuser và cartlength để hiển thị
  const cartLength = cart.length;

  // Effect transition cho cart icon
  useEffect(() => {
    if (cartLength) {
      setTransition(true);
      setTimeout(() => setTransition(false), 200);
    }
  }, [cartLength]);

  const handleLogout = () => {
    const applyData = async () => {
      queryClient.invalidateQueries(['login']);
      localStorage.removeItem('CHAT_ROOM');
      navigate('/');
    };
    sendRequest(
      `${serverHost}/api/v1/users/logout`,
      {
        credentials: import.meta.env.DEV ? 'include' : 'same-origin',
      },
      applyData
    );
  };

  return (
    <div className="flex items-center justify-between py-4">
      <ul className="flex space-x-4">
        <Link to="/">
          <li className="text-[--cust-font]">Home</li>
        </Link>
        <Link to="shop">
          <li>Shop</li>
        </Link>
        {(currentUser?.role === 'admin' ||
          currentUser?.role === 'consultant') && (
          <Link to="dashboard">
            <li>Dashboard</li>
          </Link>
        )}
        {currentUser && (
          <Link to="history">
            <li>History</li>
          </Link>
        )}
      </ul>
      <div className="text-xl">BOUTIQUE</div>
      <ul className="flex space-x-3 [&_li]:flex [&_li]:space-x-1 [&_svg]:m-auto [&_svg]:text-[#a1a1aa]">
        <Link to="cart">
          <li className="relative">
            <div
              className={`transition duration-100 ${
                transition ? 'scale-150' : 'scale-100'
              }`}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {!cartLength || (
                <div className="absolute -top-1 left-2 h-[0.75rem] w-[0.75rem] rounded-full bg-red-500 py-[0.1rem] text-center text-[0.4rem] text-zinc-100 outline outline-[1.5px] outline-white">
                  {cartLength}
                </div>
              )}
            </div>

            <p>Cart</p>
          </li>
        </Link>
        {currentUser ? (
          <>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <p>{currentUser.fullname}</p>
              <FontAwesomeIcon icon={faCaretDown} />
            </li>
            <li className="cursor-pointer" onClick={handleLogout}>
              (Logout)
            </li>
          </>
        ) : (
          <Link to="login">
            <li>Login</li>
          </Link>
        )}
      </ul>
    </div>
  );
};
export default MainNavigation;
