import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import DashboardSide from '../components/Dashboard/DashboardSide';

const DashboardPage = () => {
  const [isChatting, setIsChatting] = useState(false);

  return (
    <>
      <div className="m-0 pb-[1px] text-center text-[1em] font-semibold">
        <div className="flex gap-[1px] bg-[lightgrey] [&>*]:bg-white [&>*]:p-[1em]">
          <div className="basis-2/12">
            <Link to='/'><p className="mb-5 text-[blueviolet]">BOUTIQUE</p></Link>
            <DashboardSide isChatting={isChatting} />
          </div>
          <div className="h-[100vh] basis-10/12">
            <Outlet context={setIsChatting} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
