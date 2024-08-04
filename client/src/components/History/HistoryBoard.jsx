import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCurrentUserOrders } from '../../hook/useOrders';
import getPrice from '../../tools/getPriceFromString';

const CartBoard = () => {
  const { orders } = useCurrentUserOrders();

  return (
    <div className="my-16 w-full text-sm">
      <div className="flex bg-[--cust-bg] py-3 text-center font-medium">
        <div className="w-[15%]">ID ORDER</div>
        <div className="w-[15%]">ID USER</div>
        <div className="w-[10%]">NAME</div>
        <div className="w-[10%]">PHONE</div>
        <div className="w-[10%]">ADDRESS</div>
        <div className="w-[10%]">TOTAL</div>
        <div className="w-[10%]">DELIVERY</div>
        <div className="w-[10%]">STATUS</div>
        <div className="w-[10%]">DETAIL</div>
      </div>
      <ul className="text-center [&>li>*]:my-auto [&>li]:flex [&>li]:py-3">
        {orders &&
          orders.map((order) => {
            return (
              <li
                key={order._id}
                className="text-sm font-normal tracking-normal [&>*]:px-2"
              >
                <p className="w-[15%] break-words">{order._id}</p>
                <p className="w-[15%] break-words">{order.owner}</p>
                <p className="w-[10%]">{order.fullname}</p>
                <p className="w-[10%]">{order.phonenumber}</p>
                <p className="w-[10%]">{order.address}</p>
                <p className="w-[10%]">{getPrice(order.total)}</p>
                <p className="w-[10%]">{order.delivery}</p>
                <p className="w-[10%]">{order.status}</p>
                <Link className="w-[10%]" to={order._id} state={order}>
                  <div
                    className="w-[90%] mx-auto cursor-pointer space-x-2 px-3 py-1 outline outline-zinc-700"
                  >
                    <span>View</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default CartBoard;
