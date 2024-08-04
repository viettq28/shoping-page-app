import Hover from '../../UI/Hover';
import imgs from '../../tools/exportAllCatImg';
// Mục Categories của trang chủ, click vào sẽ chuyển đến ShopPage
const Categories = () => {
  const categories = ['iphone', 'mac', 'ipad', 'watch', 'airpod'];
  return (
    <>
      {/* Tiêu đề */}
      <div className="mt-5 py-5 text-center">
        <p className="text-xs text-zinc-400">CAREFUL CREATED COLLECTIONS</p>
        <p>BROWSE OUR CATEGORIES</p>
      </div>
      {/* Danh mục categories được map */}
      <div className="grid grid-cols-6 gap-4">
        {categories.map((category, i) => {
          return (
            <Hover key={i} className={`${i < 2 ? 'col-span-3' : 'col-span-2'}`} link={`/shop/${category}`}>
                <img src={imgs[i]} alt={i} />
            </Hover>
          );
        })}
      </div>
    </>
  );
};
export default Categories;
