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
    <div className="relative sm:basis-1/3 max-sm:w-16 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-400 text-white shadow-lg p-4 max-sm:p-0">
      {/* Navbar */}
      <Navbar />
      
      {/* Search Bar */}
      <div className="mt-4">
        <Search />
      </div>
      
      {/* Chat List */}
      <div className="mt-6">
        <ChatList />
      </div>

      {/* Logout Button (Visible only for small screens) */}
      <button
        onClick={handleLogoutClick}
        className="sm:hidden flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold text-sm p-3 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300"
      >
        <RiLogoutCircleLine size={24} />
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );
};

export default SideBar;
