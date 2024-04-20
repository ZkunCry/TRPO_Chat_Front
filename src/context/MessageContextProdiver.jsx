import { useState } from "react";
import MessageContext from "./MessageContext";

const MessageContextProvider = ({ children }) => {
  const [messagess, setMsgs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const setMessages = (msgs) => {
    setMsgs((prev) => {
      if (prev?.length === 0) {
        return [...prev, { chatRoomId: msgs[0].chatRoomId, messages: msgs }];
      } else {
        if (
          prev?.findIndex((item) => item?.chatRoomId === msgs[0].chatRoomId) ===
          -1
        )
          return [...prev, { chatRoomId: msgs[0].chatRoomId, messages: msgs }];
        else return [...prev];
      }
    });
    setLoading(false);
  };

  const addMessage = (msg) => {
    setMsgs((prev) => {
      const copy = [...prev];
      const id = copy.findIndex((item) => item.chatRoomId === msg.chatRoomId);
      copy[id].messages.push(msg);
      return copy;
    });
  };
  const messagesVlaue = {
    setMessages,
    addMessage,
    messagess,
    isLoading,
    setLoading,
  };
  return (
    <MessageContext.Provider value={messagesVlaue}>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageContextProvider;
