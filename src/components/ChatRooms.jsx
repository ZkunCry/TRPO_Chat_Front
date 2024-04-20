import React, { useContext, useId } from "react";
import ChatItem from "./ChatItem";
import AppContext from "../context/AppContext";

const ChatRooms = ({ chatrooms }) => {
  const uniqId = useId();
  const { user } = useContext(AppContext);

  return (
    <div className="flex flex-col w-full  overflow-y-auto">
      {chatrooms.map((item, index) => {
        return (
          <ChatItem
            key={`${uniqId}-${index}`}
            chatRoomId={item._Id}
            users={item.participants}
            currentUser={user}
          />
        );
      })}
    </div>
  );
};
export default ChatRooms;
