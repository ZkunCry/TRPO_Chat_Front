import { useState } from "react";
import ChatRoomContext from "./ChatRoomContext";
const MessageContextProvider = ({ children }) => {
  const [messages, setMsgs] = useState([]);

  const setMessages = (currentMessages) => {};
  const addMessage = (msg) => {
    setMsgs((prev) => [...prev, msg]);
  };
  const messagesVlaue = {
    setMessages,
    addMessage,
    messages,
  };
  return (
    <ChatRoomContext.Provider value={messagesVlaue}>
      {children}
    </ChatRoomContext.Provider>
  );
};
export default MessageContextProvider;
