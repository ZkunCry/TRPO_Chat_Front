import { useState } from "react";
import ChatRoomContext from "./ChatRoomContext";
const ChatRoomContextProvider = ({ children }) => {
  const [chatRooms, setChats] = useState([]);

  const setChatRooms = (chats) => {
    console.log(chats);
    setChats((prev) => [...prev, ...chats]);
  };
  const addChatRoom = (chat) => {
    setChats((prev) => [...prev, chat]);
  };
  const chatroom = {
    setChatRooms,
    addChatRoom,
    chatRooms,
  };
  return (
    <ChatRoomContext.Provider value={chatroom}>
      {children}
    </ChatRoomContext.Provider>
  );
};
export default ChatRoomContextProvider;
