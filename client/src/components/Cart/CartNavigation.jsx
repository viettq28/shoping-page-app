import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CartNavigation = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path)
  }
  // Đưa người dùng về ShopPage hoặc CheckoutPage
  return (
    <div className="bg-[--cust-bg] flex justify-between text-sm tracking-normal p-3 [&>div]:py-1 [&>div]:px-4 [&>div]:space-x-2 hover:[&>div]:outline hover:[&>div]:outline-zinc-700 [&>div]:cursor-pointer">
      {/* Đến ShopPage */}
      <div onClick={handleClick.bind(null, '/shop')}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Continue shopping</span>
      </div>
      {/* Đến CheckoutPage */}
      <div onClick={handleClick.bind(null, '/checkout')}>
        <span>Proceed to checkout</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};
export default CartNavigation;
