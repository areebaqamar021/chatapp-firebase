const Button = ({ className, text, ...props }) => {
  return (
    <>
      <button
        className={`${className} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-6 font-bold rounded-lg shadow-md hover:brightness-110 hover:scale-105 transition-all duration-300`}
        {...props}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
