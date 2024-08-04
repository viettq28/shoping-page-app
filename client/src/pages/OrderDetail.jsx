import { useLocation } from 'react-router-dom';
import getPrice from '../tools/getPriceFromString';

const OrderDetail = () => {
  const { state } = useLocation();

  return (
    <div className='pb-2'>
      <div className="flex flex-col p-16">
        <p className="text-3xl tracking-wide">INFORMATION ORDER</p>
        <ul className="[&>li]: mt-3 text-sm text-stone-400 [&>li]:tracking-wider">
          <li>ID User: {state.owner}</li>
          <li>Full Name: {state.fullname}</li>
          <li>Phone: {state.phonenumber}</li>
          <li>Address: {state.address}</li>
          <li>Total: {getPrice(state.total)}</li>
        </ul>
      </div>
      <div className="my-16 w-full text-sm">
        <div className="flex bg-[--cust-bg] py-3 text-center font-medium">
          <div className="w-3/12">ID PRODUCT</div>
          <div className="w-3/12">IMAGE</div>
          <div className="w-3/12">NAME</div>
          <div className="w-2/12">PRICE</div>
          <div className="w-1/12">COUNT</div>
        </div>
        <ul className="text-center [&>li>*]:my-auto [&>li]:flex [&>li]:py-3">
          {state &&
            state.productList.map((product) => {
              return (
                <li
                  key={product._id}
                  className="text-sm font-medium tracking-normal [&>*]:px-2"
                >
                  <p className="w-3/12 break-words">{product._id}</p>
                  <p className="w-3/12 break-words">
                    <img src={product.image} alt="img"></img>
                  </p>
                  <p className="w-3/12">{product.name}</p>
                  <p className="w-2/12">{getPrice(product.price)}</p>
                  <p className="w-1/12">{product.count}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default OrderDetail;
