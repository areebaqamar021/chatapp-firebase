import { logOutFromFirebase } from "../Firebase/actions";
import { useSelector } from "react-redux";
import photo from "../assets/images/defaultPhoto.jpg";
import Button from "./shared/Button";
import { resetChatOnRedux } from "../redux/chat/utils";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const handleLogoutClick = async () => {
    await logOutFromFirebase();
    resetChatOnRedux();
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg h-16 px-6 flex items-center justify-between text-white rounded-b-md">
      <span className="font-bold text-xl">Logo</span>
      <div className="flex items-center gap-4">
        <img
          className="h-10 w-10 rounded-full object-cover border-2 border-white"
          src={user?.photoURL || photo}
          alt="profile"
        />
        <span className="font-medium text-sm">{user?.displayName}</span>
        <Button
          className="bg-white text-white font-semibold text-sm py-1 px-4 rounded-md hover:bg-gray-100 transition-all duration-300"
          text="Logout"
          onClick={handleLogoutClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
