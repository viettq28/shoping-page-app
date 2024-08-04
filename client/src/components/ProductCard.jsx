import getPrice from '../tools/getPriceFromString';

import Hover from '../UI/Hover';


const ProductCard = ({ product, className = '' }) => {
  // Card của product
  return (
    <div className={className}>
      <Hover>
        <img
          src={product.images[0]}
          alt={product._id}
          id={product._id}
        />
      </Hover>
      <div className="space-y-1 p-2 text-center">
        <p className="text-sm font-medium">{product.name}</p>
        <p className="text-xs text-zinc-400">{getPrice(product.price)}</p>
      </div>
    </div>
  );
};
export default ProductCard;
