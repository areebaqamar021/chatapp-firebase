import { logOutFromFirebase } from "../Firebase/actions";
import Navbar from "../components/Navbar";
import Search from "../components/Search/Search";
import { resetChatOnRedux } from "../redux/chat/utils";
import ChatList from "./chat/ChatList";
import { RiLogoutCircleLine } from "react-icons/ri";

const SideBar = () => {
  const handleLogoutClick = async () => {
    await logOutFromFirebase();
    resetChatOnRedux();
  };

  return (
    <div className="relative sm:basis-1/3 max-sm:w-14 bg-sky-950 text-white rounded-r-none p-4 max-sm:p-0 ">
      <Navbar />
      <Search />
      <ChatList />

      <button
        onClick={handleLogoutClick}
        className="sm:hidden text-white w-full  flex justify-center items-center  hover:brightness-125 duration-150 bg-sky-950 text-sm font-medium max-sm:absolute max-sm:bottom-0 max-sm:left-0 rounded-lg"
      >
        <RiLogoutCircleLine size={36} />
      </button>
    </div>
  );
};

export default SideBar;
