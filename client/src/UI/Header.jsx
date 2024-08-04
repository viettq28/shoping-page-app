const Header = ({title}) => {
  return (
    <div className="flex justify-between bg-[--cust-bg] p-16 items-center">
      <p className="text-2xl tracking-wide">{title.toUpperCase()}</p>
      <p className="text-sm text-zinc-400">{title.toUpperCase()}</p>
    </div>
  );
};
export default Header;
