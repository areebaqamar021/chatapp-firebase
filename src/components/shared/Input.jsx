const Input = ({ className, ...props }) => {
  return (
    <>
      <input
        className={`${className} p-4 border-2 border-indigo-300 w-full bg-white/80 text-gray-800 placeholder:text-gray-400 outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all duration-300`}
        {...props}
      />
    </>
  );
};

export default Input;
