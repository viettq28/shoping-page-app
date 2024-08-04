import Button from '../../UI/Button';

const OtherInfos = () => {
  // Component OtherInfo của MainPage
  return (
    <>
      <div className="mt-11 flex justify-around bg-[--cust-bg] py-11">
        <div>
          <p>FREE SHIPPING</p>
          <p className="text-sm text-zinc-400">Free shipping worldwide</p>
        </div>
        <div>
          <p>24 x 7 SERVICES</p>
          <p className="text-sm text-zinc-400">Free shipping worldwide</p>
        </div>
        <div>
          <p>FESTIVAL OFFER</p>
          <p className="text-sm text-zinc-400">Free shipping worldwide</p>
        </div>
      </div>
      <div className="mb-9 flex justify-between py-9">
        <div>
          <p>LET&lsquo;S BE FRIENDS!</p>
          <p className="text-sm text-zinc-400">
            Nisi Nisi tempor consequat laboris nisi!
          </p>
        </div>
        <div className="flex w-1/2 [&>*]:h-full">
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-3/4 border border-zinc-400 px-3 text-xs focus:outline-none"
          />
          <Button className="w-1/4">Subscribe</Button>
        </div>
      </div>
    </>
  );
};
export default OtherInfos;
