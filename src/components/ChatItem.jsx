import React from "react";
import { Link } from "react-router-dom";

export const ChatItem = ({ users, chatRoomId, currentUser }) => {
  const companion = currentUser._Id === users[0]._Id ? users[1] : users[0];
  return (
    <Link
      to={`/chatmainpage?chatId=${chatRoomId}&name=${companion.name}&recvId=${companion._Id}`}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 dark:border-[#593A8D]"
    >
      <div className="w-full">
        <div className="text-lg font-semibold">{companion.name}</div>
        <span className="text-gray-500">Pick me at 9:00 Am</span>
      </div>
    </Link>
  );
};
export default ChatItem;
