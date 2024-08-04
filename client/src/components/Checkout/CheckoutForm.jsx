import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsLoggedIn from '../../hook/useIsLoggedIn';
import useHttp from '../../hook/useHttp';
import { useMutateOrder } from '../../hook/useOrders';
import CartContext from '../../contexts/CartContextProvider';
import ServerContext from '../../contexts/SeverContextProvider';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { Fragment } from 'react';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useIsLoggedIn();
  const { cart, setCart } = useContext(CartContext);
  const serverHost = useContext(ServerContext);
  const { sendRequest } = useHttp();
  const { mutateAsync } = useMutateOrder();
  const [inputValue, setInputValue] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    if (currentUser) {
      setInputValue({
        full_name: currentUser.fullname,
        email: currentUser.email,
        phone_number: currentUser.phone,
        address: '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({
        owner: currentUser._id,
        fullname: inputValue.full_name,
        email: inputValue.email,
        phonenumber: inputValue.phone_number,
        address: inputValue.address,
        cart,
        total: cart.reduce(
          (acc, item) => acc + +item.product.price * +item.quantity,
          0
        ),
      });
      sendRequest(
        `${serverHost}/api/v1/users/cart`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([]),
        },
        () => {
          setCart([]);
          navigate('/history');
        }
      );
    } catch (err) {
      console.log(err)
    }
  };

  // CheckoutForm
  return (
    <div className="w-[70%] text-zinc-500">
      <form
        onSubmit={handlePlaceOrder}
        className="[&>*:not(button)]:w-full [&>input]:mb-5 [&>input]:mt-2 [&>label]:uppercase [&>label]:tracking-widest"
      >
        {Object.entries(inputValue).map(([key, value], i) => {
          return (
            <Fragment key={i}>
              <label htmlFor={key}>{key.replace('_', ' ')}:</label>
              <Input
                className="py-3 shadow-none placeholder:text-sm placeholder:text-zinc-400"
                name={key}
                placeholder={`Enter Your ${key
                  .split('_')
                  .map((k) => k.replace(/^([a-z])/g, (c) => c.toUpperCase()))
                  .join(' ')} Here!`}
                value={value}
                onChange={handleChange}
              />
            </Fragment>
          );
        })}
        <Button type="submit" className="w-fit !text-lg">
          Place order
        </Button>
      </form>
    </div>
  );
};
export default CheckoutForm;
