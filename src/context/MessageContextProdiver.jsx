import { useState } from "react";
import ChatRoomContext from "./ChatRoomContext";
import MessageContext from "./MessageContext";

const MessageContextProvider = ({ children }) => {
  const [messagess, setMsgs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const setMessages = (msgs, chatId) => {
    setMsgs((prev) => {
      if (prev.length === 0) {
        return [...prev, { chatRoomId: chatId, messages: msgs }];
      } else {
        if (prev.findIndex((item) => item?.chatRoomId === chatId) === -1)
          return [...prev, { chatRoomId: chatId, messages: msgs }];
        else return [...prev];
      }
    });
    setLoading(false);
  };

  const addMessage = (msg) => {
    setMsgs((prev) =>
      prev.map((item, index) => {
        if (item.chatRoomId === msg.chatRoomId) {
          item.messages.push(msg);
        }
        return item;
      })
    );
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
