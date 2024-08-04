import { useParams } from "react-router-dom";

import ShopSideMenu from "./ShopSideMenu";
import ShopProducts from "./ShopProducts";

const ShopBody = () => {
  const { category: curCat = 'all' } = useParams();
  // Render ShopSideMenu và ShopProducts(cùng với category trên params, không có thì là 'all')
  return <div className="flex my-6 gap-6">
    <ShopSideMenu />
    <ShopProducts key={curCat} curCat={curCat}/>
  </div>
};
export default ShopBody