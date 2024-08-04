import { useState, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import getPrice from '../../tools/getPriceFromString';
import useHttp from '../../hook/useHttp';
import CartContext from '../../contexts/CartContextProvider';
import ServerContext from '../../contexts/SeverContextProvider';
import useIsLoggedIn from '../../hook/useIsLoggedIn';

import Button from '../../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const DetailMain = ({ product }) => {
  const { currentUser } = useIsLoggedIn();
  const queryClient = useQueryClient();
  // State số lượng sản phẩm
  const [qty, setQty] = useState(1);
  const { cart, setCart } = useContext(CartContext);
  const { sendRequest } = useHttp();
  const serverHost = useContext(ServerContext);
  // Thêm sản phẩm và sổ lượng vào cart
  const handleClick = () => {
    const url = `${serverHost}/api/v1/users/cart/`;
    const body = { product: product._id, quantity: qty };
    
    const applyData = () => {
      let isModify = false;
      const newCart = cart.map(item => {
        if (item.product._id === product._id) {
          isModify = true;
          item.quantity = qty;
        }
        return item;
      });
      if (!isModify) newCart.push({ product, quantity: qty });
      setCart(newCart);
    };
    const handleError = () => {
      queryClient.invalidateQueries(['login']);
    }

    sendRequest(
      url,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      applyData, handleError
    );
  };
  // Tăng giảm số lượng
  const handleIncrement = (e) => {
    e.preventDefault();
    setQty((qty) => qty + 1);
  };
  const handleDecrement = (e) => {
    e.preventDefault();
    setQty((qty) => qty - 1);
  };

  return (
    <div className="mt-10 flex min-h-[400px] w-full bg-white">
      <div className="flex w-1/2">
        <div className="px-2 py-5">
          {product.images.map((img, i) => {
            return <img key={i} src={img} alt="a" className="object-cover" />;
          })}
        </div>
        <img
          src={product.images[0]}
          alt="a"
          className="h-fit w-4/5 object-cover p-5"
        />
      </div>
      {/* Chi tiết */}
      <div className="w-1/2 space-y-3 px-5 py-5 italic">
        {/* Tên, giá, miêu tả, phân loại */}
        <p className="text-3xl font-semibold">{product.name}</p>
        <p className=" text-xl text-zinc-500">{getPrice(product.price)}</p>
        <p className="line-clamp-[8] text-sm text-zinc-400">
          {product.short_desc}
        </p>
        <p>
          CATEGORY:
          <span className="ml-2 text-zinc-400">{product.category}</span>
        </p>
        {/* Tăng, giảm, thêm vào cart */}
        {currentUser ? (
          <div className="flex">
            <div className="flex w-1/2 border border-zinc-300 p-2">
              <span className="text-zinc-400">QUANTITY</span>
              <div className="ml-auto flex w-1/4 justify-center text-center [&>*]:w-1/3">
                {/* Giảm số lượng (không quá 1) */}
                <div
                  className="cursor-pointer"
                  {...(qty > 1 && { onMouseDown: (e) => handleDecrement(e) })}
                >
                  <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                </div>
                {/* Số lượng hiện tại */}
                <p>{qty}</p>
                {/* Tăng số lương */}
                <div className="cursor-pointer" onMouseDown={handleIncrement}>
                  <FontAwesomeIcon icon={faCaretRight} size="lg" />
                </div>
              </div>
            </div>
            {/* Thêm vảo cart */}
            <Button className="text-base leading-6" handleClick={handleClick}>
              Add to cart
            </Button>
          </div>
        ) : (
          <div className="w-full bg-red-700 py-4 text-center text-sm font-normal italic text-neutral-100  outline-none">
            Please login to add this item to your cart!!!
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailMain;
