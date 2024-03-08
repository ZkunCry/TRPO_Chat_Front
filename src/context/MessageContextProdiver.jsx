import { useState } from "react";
import ChatRoomContext from "./ChatRoomContext";
import MessageContext from "./MessageContext";

const MessageContextProvider = ({ children }) => {
  const [messages, setMsgs] = useState([]);

  const setMessages = (currentMessages) => {
    setMsgs(currentMessages);
  };
  const addMessage = (msg) => {
    setMsgs((prev) => [...prev, msg]);
  };
  const messagesVlaue = {
    setMessages,
    addMessage,
    messages,
  };
  return (
    <MessageContext.Provider value={messagesVlaue}>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageContextProvider;
