import React, { useId } from "react";
import ChatItem from "./ChatItem";

const ChatRooms = ({ chatrooms }) => {
  const uniqId = useId();
  return (
    <div className="flex flex-col w-full  overflow-y-auto">
      {chatrooms.map((item, index) => {
        return (
          <ChatItem
            key={`${uniqId}-${index}`}
            chatRoomId={item._Id}
            users={item.participants}
          />
        );
      })}
    </div>
  );
};
export default ChatRooms;
