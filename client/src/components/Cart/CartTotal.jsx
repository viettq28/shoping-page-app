import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import getPrice from '../../tools/getPriceFromString';

import Button from '../../UI/Button';

const CartTotal = ({ cart }) => {
  // Tính tổng tiền cả cart từ giá và số lượng mỗi sản phẩm
  const total = cart.reduce(
    (acc, item) => acc + +item.product.price * +item.quantity,
    0
  );

  return (
    <div className="h-fit w-[30%] space-y-5 bg-[--cust-bg] p-7 font-medium">
      {/* Tiêu đề */}
      <p className="text-xl">CART TOTAL</p>
      {/* Thân */}
      <div className="space-y-2 text-sm">
        {/* Mục Subtotal hiện tổng tiền */}
        <div className="flex justify-between">
          <p>SUBTOTAL</p>
          <p className="font-normal tracking-normal text-zinc-400">
            {getPrice(total)}
          </p>
        </div>
        <div className="border-b border-b-zinc-400"></div>
        {/* Mục Total hiển thị tổng tiền sau khi tính toán phụ chi nếu có */}
        <div className="flex justify-between">
          <p>TOTAL</p>
          <p className="text-base font-normal tracking-normal">
            {getPrice(total)}
          </p>
        </div>
      </div>
      {/* Mục nhập liệu */}
      <div className="text-xs [&>*]:w-full">
        <input
          type="text"
          placeholder="Enter your coupon"
          className="p-3 outline outline-zinc-200  placeholder:align-middle placeholder:font-normal placeholder:text-zinc-400 focus:outline-zinc-500"
        />
        <Button className="space-x-2 py-3 text-xs not-italic outline outline-offset-0 outline-neutral-700">
          <FontAwesomeIcon icon={faGift} style={{ color: '#ffffff' }} />
          <span>Apply coupon</span>
        </Button>
      </div>
    </div>
  );
};
export default CartTotal;
