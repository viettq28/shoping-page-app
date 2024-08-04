const Input = ({type = 'text', className, handleChange, ...others}) => {
  
  return (
    <input
      className={`appearance-none border px-3 py-2 leading-tight text-zinc-900 shadow placeholder:text-zinc-500 focus:border-gray-700 focus:shadow-lg focus:outline-none ${className ? className : ''}`}
      name={others?.id}
      type={type}
      onChange={handleChange}
      {...others}
    />
  );
};
export default Input;
