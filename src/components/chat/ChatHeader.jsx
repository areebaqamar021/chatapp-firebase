import { BsCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import photo from "../../assets/images/defaultPhoto.jpg";

export const ChatHeader = ({ photoURL, displayName }) => (
  <div className="h-20 max-sm:h-12 bg-sky-950 text-white flex justify-between items-center p-4 sm:p-2">
    <div className="flex items-center space-x-4">
      <img
        src={photoURL || photo}
        alt=""
        className="rounded-full h-12 w-12 max-sm:h-8 max-sm:w-8 object-cover object-center"
      />
      <span className="font-medium text-slate-100 text-lg sm:text-xl">
        {displayName}
      </span>
    </div>

    <div className="flex text-3xl space-x-4">
      <BsCameraVideoFill className="cursor-pointer hover:text-slate-200 duration-150 max-sm:h-8 max-sm:w-8" />
      <FaUserPlus className="cursor-pointer hover:text-slate-200 duration-150 max-sm:h-8 max-sm:w-8" />
      <BsThreeDots className="cursor-pointer hover:text-slate-200 duration-150 max-sm:h-8 max-sm:w-8" />
    </div>
  </div>
);
