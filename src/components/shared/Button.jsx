const Button = ({ className, text, ...props }) => {
  return (
    <>
      <button
        className={`${className}  text-white py-2 px-4 font-bold hover:brightness-125 duration-150`}
        {...props}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
