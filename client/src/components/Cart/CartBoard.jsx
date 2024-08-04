import CartItem from './CartItem';
import CartNavigation from './CartNavigation';

const CartBoard = ({ cart, handler }) => {
  // List các product trong cart, được render bởi CartItem
  return (
    <div className="w-[70%] text-sm">
      <div className="flex bg-[--cust-bg] py-3 text-center [&>*]:w-1/6">
        <div>IMAGE</div>
        <div>PRODUCT</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
        <div>REMOVE</div>
      </div>
      <ul className="text-center [&>li>*]:my-auto [&>li>*]:w-1/6 [&>li]:flex [&>li]:py-3">
        {cart.map((item) => {
          return (
            <li key={item.product._id} className="tracking-normal">
              <CartItem
                id={item.product._id}
                product={item.product}
                quantity={item.quantity}
                handler={handler}
              />
            </li>
          );
        })}
      </ul>
      <CartNavigation />
    </div>
  );
};
export default CartBoard;
