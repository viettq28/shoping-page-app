import { useParams } from 'react-router-dom';
import { useProducts } from '../hook/useProducts';

import DetailMain from '../components/Detail/DetailMain';
import DetailDescription from '../components/Detail/DetailDescription';
import DetailRelatedList from '../components/Detail/DetailRelatedList';
import Spinner from '../UI/Spinner';
import ScrollToTop from '../utilComponents/ScrollToTop';

// Lấy productId để truyền product tương ứng, và array các product cùng category cho component
const DetailPage = () => {
  const { productId } = useParams();
  const { products, isPending } = useProducts();
  const foundProduct =
    products && products.find((product) => product._id === productId);
  const relatedList =
    products &&
    products.filter(
      (product) =>
        (product.category === foundProduct.category) &
        (product !== foundProduct)
    );

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <DetailMain product={foundProduct} />
          <DetailDescription desc={foundProduct.long_desc} />
          <DetailRelatedList list={relatedList} />
          <ScrollToTop />
        </>
      )}
    </>
  );
};
export default DetailPage;
