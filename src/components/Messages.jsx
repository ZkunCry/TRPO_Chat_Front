import React, { useContext, useEffect, useId, useState } from "react";
import { instance } from "../utils/axios";
import MessageContext from "../context/MessageContext";
import AppContext from "../context/AppContext";
import ConnectionContext from "../context/ConnectionContext";
const Messages = ({ name, chatId, recvId }) => {
  const [message, setMessage] = useState("");
  const { setMessages, messages, addMessage } = useContext(MessageContext);
  const { connection } = useContext(ConnectionContext);
  const { user } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const id = useId();
  useEffect(() => {
    if (connection?.state === "Connected") {
      connection.send("getMessages", chatId);
      connection.on("onMessage", (message) => {
        console.log("test");
        addMessage(message);
      });
      connection.on("onGetMessages", (messages) => {
        setMessages(messages);
        setLoading(false);
      });
    }
  }, [connection.state]);
  const handleSubmit = async () => {
    connection.invoke("SendMessage", chatId, message, user._Id);
  };
  return (
    <div className="w-full px-5 flex flex-col justify-between min-h-chatHeight">
      {!isLoading ? (
        <>
          <div className="flex flex-col mt-5 overflow-auto">
            {messages.map((item, index) => {
              return item.senderId === recvId ? (
                <div key={`${id}-${index}`} className="flex justify-start mb-4">
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    {item.text}
                  </div>
                </div>
              ) : (
                <div key={`${id}-${index}`} className="flex justify-end mb-4">
                  <div className="mr-2 py-3 px-4 dark:bg-[#593A8D] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="py-5 flex ">
            <input
              className="flex-1 text-white bg-transparent border-2 dark:border-[#593A8D]  py-5 px-3 rounded-xl focus:outline-none"
              type="text"
              placeholder="Type your message here..."
              onChange={({ target }) => setMessage(target.value)}
            />
            <button className=" bg-sky-400" onClick={handleSubmit}>
              Click
            </button>
          </div>
        </>
      ) : (
        <div className="flex text-white justify-center items-center flex-1">
          <h1>Loading..</h1>
        </div>
      )}
    </div>
  );
};
export default Messages;
