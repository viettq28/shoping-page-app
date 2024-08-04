const DetailDescription = ({ desc }) => {
  // Description Component của DetailPage
  return (
    <div className="my-10 w-3/5">
      <div className="w-fit bg-neutral-700 px-6 py-2 text-sm font-light text-neutral-100">
        DESCRIPTION
      </div>
      <p className="mt-3 text-lg">PRODUCT DESCRIPTION</p>
      <p className="mt-4 whitespace-pre text-sm text-zinc-400">{desc}</p>
    </div>
  );
};
export default DetailDescription;
