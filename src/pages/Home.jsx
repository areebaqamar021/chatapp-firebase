import SideBar from "../components/SideBar";
import Chat from "../components/chat/Chat";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-400 min-h-screen flex items-center justify-center">
      <div className="bg-gray-50 shadow-lg w-screen h-screen flex">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
