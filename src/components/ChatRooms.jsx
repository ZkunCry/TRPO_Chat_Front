import React, { useContext, useEffect, useId, useState } from "react";
import ChatItem from "./ChatItem";
import AppContext from "../context/AppContext";
import useCustomParams from "../utils/hooks/useCustomParams";
import ConnectionContext from "../context/ConnectionContext";
import MessageContext from "../context/MessageContext";
const ChatRooms = ({ chatrooms }) => {
  const uniqId = useId();
  const { chatId } = useCustomParams();
  const { connection } = useContext(ConnectionContext);
  const { setMessages, addMessage } = useContext(MessageContext);
  const { user } = useContext(AppContext);

  const handleMessage = (messages) => {
    if (chatId !== undefined) setMessages(messages, chatId);
  };

  const handleIncomingMessage = (message) => {
    addMessage(message);
  };

  useEffect(() => {
    if (connection?.state === "Connected") {
      if (
        !connection?._methods.hasOwnProperty("ongetmessages") &&
        !connection?._methods.hasOwnProperty("onmessage")
      ) {
        connection.on("onGetMessages", handleMessage);
        connection.on("onMessage", handleIncomingMessage);
      }
    }
    return () => {
      connection?.off("onGetMessages", handleMessage);
      connection?.off("onMessage", handleIncomingMessage);
    };
  }, [connection?.state, chatId]);

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
