import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const ShopSideMenu = () => {
  const categories = {
    'IPHONE & MAC': ['Iphone', 'Ipad', 'Macbook'],
    WIRELESS: ['Airpod', 'Watch'],
    OTHER: ['Mouse', 'Keyboard', 'Other'],
  };
  // Danh sách các categories
  return (
    <div className="flex basis-1/4 flex-col [&_div]:py-3 [&_div]:font-medium">
      {/* Tiêu đề */}
      <div>CATEGORIES</div>
      <div className="pl-2 text-sm [&>.category]:bg-[--cust-bg] [&_*:not(a)]:px-4 [&_a]:text-zinc-400 hover:[&_a]:cursor-pointer hover:[&_a]:text-[--cust-font] [&_p]:py-2 [&_p]:font-normal">
        <div className="bg-stone-950 text-stone-100">APPLE</div>
        {/* Link đến 'all' param */}
        <NavLink className={({isActive}) => isActive ? 'active-text' : ''} to="/shop/all">
          <div>All</div>
        </NavLink>
        {Object.entries(categories).map(([key, values]) => {
          return (
            <Fragment key={key}>
              <div className="category">{key}</div>
              {values.map((value, i) => (
                <NavLink key={i} className={({isActive}) => isActive ? 'active-text' : ''} to={`/shop/${value.toLowerCase()}`}>
                  <p>{value}</p>
                </NavLink>
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default ShopSideMenu;
