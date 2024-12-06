import { BsCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import photo from "../../assets/images/defaultPhoto.jpg";

export const ChatHeader = ({ photoURL, displayName }) => (
  <div className="h-20 max-sm:h-12 bg-indigo-400 text-white flex justify-between items-center p-4 sm:p-2 shadow-md">
    <div className="flex items-center space-x-4">
      <img
        src={photoURL || photo}
        alt=""
        className="rounded-full h-12 w-12 max-sm:h-8 max-sm:w-8 object-cover object-center"
      />
      <span className="font-medium text-white text-lg sm:text-xl">
        {displayName}
      </span>
    </div>

    <div className="flex text-2xl sm:text-3xl space-x-4">
      <BsCameraVideoFill className="cursor-pointer hover:text-indigo-200 transition-transform transform hover:scale-110 duration-150" />
      <FaUserPlus className="cursor-pointer hover:text-indigo-200 transition-transform transform hover:scale-110 duration-150" />
      <BsThreeDots className="cursor-pointer hover:text-indigo-200 transition-transform transform hover:scale-110 duration-150" />
    </div>
  </div>
);
