import { AiOutlineLoading } from "react-icons/ai";

const LoadingSpin = ({ className, ...props }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <AiOutlineLoading className="animate-spin h-10 w-10 text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </div>
  );
};

export default LoadingSpin;
