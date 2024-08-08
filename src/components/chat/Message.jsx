import { useSelector } from "react-redux";
import { selectUserById } from "../../redux/users/usersSlice";
import photo from "../../assets/images/defaultPhoto.jpg";
import moment from "moment";

const Message = ({ message, arr, index }) => {
  const { user } = useSelector((state) => state.auth);
  const messageOwner = useSelector((state) =>
    selectUserById(state, message?.ownerId)
  );

  const owner = user?.uid === message?.ownerId;
  const isNear =
    arr[index]?.ownerId.toString() === arr[index - 1]?.ownerId.toString();
  const isNearEnd =
    arr[index]?.ownerId.toString() === arr[index + 1]?.ownerId.toString();

  return (
    <div
      className={`flex gap-5 ${isNear ? "mt-0.5" : "mt-5"}   ${
        owner ? "flex-row-reverse" : ""
      }`}
    >
      {!owner && (
        <img
          src={messageOwner?.photoURL || photo}
          alt=""
          className="h-6 w-6 rounded-full object-cover object-center"
        />
      )}
      <div
        className={`flex flex-col ${
          owner ? "items-end" : "items-start"
        } gap-2 `}
      >
        <p
          className={`relative px-5 py-1 max-w-80 rounded-3xl flex flex-row gap-1 ${
            owner
              ? "rounded-br-none bg-sky-700 text-white "
              : "rounded-bl-none bg-white "
          } ${isNearEnd ? "!rounded-3xl" : "mb-2"} break-all`}
        >
          {message?.message}
          <span
            className={`text-nowrap text-xs text-slate-500 self-end ${
              owner ? " !text-slate-300" : ""
            }`}
          >
            {moment(message?.time).format("LT")}
          </span>
        </p>
        {message?.photoURL && (
          <img
            src={message?.photoURL}
            alt=""
            className="w-1/3 hover:w-full duration-500"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
