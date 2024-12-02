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
    <div className=" max-sm:hidden flex items-center bg-black/40 rounded-r-none h-20 p-2 justify-between text-slate-50">
      <span className="font-black text-xl flex items-center">Logo</span>
      <div className="flex items-center gap-2">
        <img
          className="bg-slate-50 h-8 w-8 rounded-full object-cover border-2 border-blue-500"
          src={user?.photoURL || photo}
          alt="profile image"
        />
        <span>{user?.displayName}</span>
        <Button
          className="bg-amber-950 text-sm font-medium max-sm:absolute max-sm:top-0 max-sm:left-0 border border-amber-950 px-3 py-1 rounded "
          text="Logout"
          onClick={handleLogoutClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
