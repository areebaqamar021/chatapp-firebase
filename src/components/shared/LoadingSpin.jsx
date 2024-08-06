import { AiOutlineLoading } from "react-icons/ai";

const LoadingSpin = ({ ...props }) => {
  return (
    <div {...props}>
      <AiOutlineLoading className="animate-spin h-12 w-12" />
    </div>
  );
};

export default LoadingSpin;
