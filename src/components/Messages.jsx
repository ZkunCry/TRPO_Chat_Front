import React, { useContext, useEffect, useId, useRef, useState } from "react";
import MessageContext from "../context/MessageContext";
import AppContext from "../context/AppContext";
import ConnectionContext from "../context/ConnectionContext";
const Messages = ({ name, chatId, recvId }) => {
  const [message, setMessage] = useState("");
  const { messagess, setLoading, isLoading } = useContext(MessageContext);
  const { connection } = useContext(ConnectionContext);
  const { user } = useContext(AppContext);
  const id = useId();
  const ref = useRef(null);
  useEffect(() => {
    if (connection?.state === "Connected") {
      setLoading(true);
      connection.send("getMessages", chatId);
    }
  }, [chatId, connection?.state]);
  const handleSubmit = async () => {
    connection.invoke("SendMessage", chatId, message, user._Id);
  };
  useEffect(() => {
    ref?.current?.scrollTo(0, 99999);
  }, [messagess]);
  return (
    <div className="w-full px-5 flex flex-col justify-between min-h-chatHeight">
      {!isLoading ? (
        <>
          <div ref={ref} className="flex flex-col mt-5 overflow-auto">
            {messagess
              ?.find((item) => item.chatRoomId === chatId)
              ?.messages.map((item, index) => {
                return item.senderId === recvId ? (
                  <div
                    key={`${id}-${index}`}
                    className="flex justify-start mb-4"
                  >
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
              className="flex-1 text-white bg-transparent border-2 dark:border-[#593A8D]  py-3 px-3 rounded-xl focus:outline-none"
              type="text"
              placeholder="Type your message here..."
              onChange={({ target }) => setMessage(target.value)}
            />
            <button className=" bg-indigo-950" onClick={handleSubmit}>
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
