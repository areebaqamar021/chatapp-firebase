const Input = ({ className, ...props }) => {
  return (
    <>
      <input
        className={`${className} p-4 border-b border-neutral-300 w-96 outline-none ring-inset focus:ring-2 focus:ring-sky-400 rounded`}
        {...props}
      />
    </>
  );
};

export default Input;
