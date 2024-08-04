import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import getPrice from '../../tools/getPriceFromString';

const CartItem = memo(function CartItem({ id, product, quantity, handler }) {
  // Tổng tiền từ giá và số lượng
  const totalPrice = +product.price * +quantity;
  // Function tăng và giảm số lượng
  const { handleDecrement, handleIncrement, handleDeletion } = handler.call(null, id);
  return (
    <>
      {/* Cột Hình ảnh */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="object-cover px-4"
      ></img>
      {/* Cột tên sản phẩm */}
      <p className="px-2 text-base font-medium">{product.name}</p>
      {/* Cột giá */}
      <p className="px-4 font-normal text-zinc-400">
        {getPrice(product.price)}
      </p>
      {/* Cột tăng giảm số lượng sản phẩm bằng cách click mũi tên*/}
      <div className="flex justify-center px-3 [&>*]:flex [&>*]:basis-1/3 [&>*]:items-center [&>*]:justify-center">
        <div
          className="cursor-pointer"
          {...(quantity > 1 && { onMouseDown: handleDecrement })}
        >
          <FontAwesomeIcon icon={faCaretLeft} size="lg" />
        </div>
        <div>{quantity}</div>
        <div className="cursor-pointer" onMouseDown={handleIncrement}>
          <FontAwesomeIcon icon={faCaretRight} size="lg" />
        </div>
      </div>
      {/* Cột hiển thị tổng giá */}
      <p className="px-4 font-normal text-zinc-400">{getPrice(totalPrice)}</p>
      {/* Cột xóa sản phẩm */}
      <FontAwesomeIcon
        className="cursor-pointer"
        onClick={handleDeletion}
        icon={faTrashCan}
        size="lg"
      />
    </>
  );
});
export default CartItem;
