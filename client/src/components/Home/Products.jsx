import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useProducts } from '../../hook/useProducts';

import getPrice from '../../tools/getPriceFromString';

import Popup from '../Popup';
import ProductCard from '../ProductCard';

const Products = () => {
  // State product hiện tại
  const [curProduct, setCurProduct] = useState(null);
  const { products, isFetching } = useProducts();
  // Open Modal
  const openPopup = (e) => {
    const target = e.target.firstChild;
    if (target?.nodeName === 'IMG') {
      const foundProduct = products.find(
        (product) => product._id === target.id
      );
      setCurProduct({
        id: foundProduct._id,
        name: foundProduct.name,
        img: foundProduct.images[0],
        price: getPrice(foundProduct.price),
        desc: foundProduct.long_desc,
      });
    }
  };
  // Đóng Modal bằng cách setCurProduct = null
  const closePopup = useCallback(() => {
    setCurProduct(null);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="mt-5 py-5">
        <p className="text-xs text-zinc-400">MADE THE HARD WAY</p>
        <p>TOP TRENDING PRODUCTS</p>
      </div>
      {/* List Products, truyền click listener vào parent node */}
      <div
        className="flex flex-wrap justify-between [&>*]:max-w-[23%]"
        onClick={openPopup}
      >
        {/* Hiển thị các ProductCard */}
        {!isFetching &&
          products.map((product) => {
            return (
              <ProductCard key={Object.values(product._id)} product={product} />
            );
          })}
        {/* Show modal và truyền curProduct cùng phương thức đóng modal vào Popup */}
        {curProduct &&
          createPortal(
            <Popup closePopup={closePopup} {...curProduct} />,
            document.getElementById('modal')
          )}
      </div>
    </>
  );
};
export default Products;
