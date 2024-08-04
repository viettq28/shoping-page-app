import { useContext } from 'react';
import CartContext from '../../contexts/CartContextProvider';

import getPrice from '../../tools/getPriceFromString';

const CheckoutBill = () => {
  const { cart } = useContext(CartContext);
  // Tính tổng tiền toàn cart
  const total = cart.reduce(
    (acc, item) => acc + +item.product.price * +item.quantity,
    0
  );
  
  return (
    <div className="h-fit w-[30%] space-y-4 bg-[--cust-bg] p-7 font-medium">
      {/* Tiêu đề */}
      <p className="text-xl">CART TOTAL</p>
      {/* Nội dung */}
      <div className="text-sm tracking-tighter">
        {cart.map(item => {
          // List các sản phẩm trong cart
          return (
            <div
              key={item.product.name}
              className="flex justify-between [&>*]:max-w-[49%] border-b border-b-zinc-400 py-2"
            >
              {/* Tên sản phẩm */}
              <p>{item.product.name}</p>
              {/* Giá tiền và số lượng trong cart */}
              <p className="font-normal tracking-normal text-zinc-400">
                {`${getPrice(item.product.price)} x ${item.quantity}`}
              </p>
            </div>
          );
        })}
        {/* Hiển thị tổng tiền */}
        <div className="flex justify-between py-2 text-base">
          <p>TOTAL</p>
          <p className="text-xl font-normal">
            {getPrice(total)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CheckoutBill;
