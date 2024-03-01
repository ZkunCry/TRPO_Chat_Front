import React, { useContext, useEffect, useState } from "react";
import { instance } from "../utils/axios";
import MessageContext from "../context/MessageContext";
import AppContext from "../context/AppContext";
const Messages = ({ connection }) => {
  const { setMessages } = useContext(MessageContext);
  const { user } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(connection);
    connection.invoke(
      "SendMessage",
      "65dcb1697126fc37f8ae7600",
      "testmsg",
      user._Id
    );
    connection.on("onMessage", (message) => {
      console.log(message);
    });
  }, [connection]);
  return (
    <div className="w-full px-5 flex flex-col justify-between min-h-chatHeight">
      {!isLoading ? (
        <>
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 dark:bg-[#593A8D] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Welcome to group everyone !
              </div>
            </div>
            <div className="flex justify-start mb-4">
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                at praesentium, aut ullam delectus odio error sit rem.
                Architecto nulla doloribus laborum illo rem enim dolor odio
                saepe, consequatur quas?
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div>
                <div className="mr-2 py-3 px-4 dark:bg-[#593A8D] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magnam, repudiandae.
                </div>

                <div className="mt-4 mr-2 py-3 px-4 dark:bg-[#593A8D] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis, reiciendis!
                </div>
              </div>
            </div>
            <div className="flex justify-start mb-4">
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                happy holiday guys!
              </div>
            </div>
          </div>
          <div className="py-5 ">
            <input
              className="w-full text-white bg-transparent border-2 dark:border-[#593A8D]  py-5 px-3 rounded-xl focus:outline-none"
              type="text"
              placeholder="Type your message here..."
            />
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
