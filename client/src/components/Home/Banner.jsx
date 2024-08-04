import { useNavigate } from 'react-router-dom';

import Button from '../../UI/Button';
import banner from '../../../public/resources/banner1.jpg';

// Banner trang chủ, Button để chuyển hướng sang ShopPage
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative lg:h-[450px]">
      <div className="absolute left-[7%] top-1/2 max-w-[50%] -translate-y-1/2 space-y-3 lg:max-w-[30%]">
        <p className="text-sm text-zinc-400">NEW INSPIRATION 2020</p>
        <p className="text-2xl">20% OFF ON NEW SEASON</p>        
        <Button handleClick={() => navigate('/shop')}>Browse collections</Button>
      </div>
      <img
        src={banner}
        alt="banner"
        className="h-full object-cover"
      ></img>
    </div>
  );
};
export default Banner;
