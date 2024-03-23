import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { instance } from "../utils/axios";
import Modal from "../components/Modal";
import { Form, useForm } from "react-hook-form";
import ChatRoomContext from "../context/ChatRoomContext";
import ChatRooms from "../components/ChatRooms";
import Messages from "../components/Messages";
import ConnectionContext from "../context/ConnectionContext";
import useCustomParams from "../utils/hooks/useCustomParams";
import MessageContext from "../context/MessageContext";

export const ChatPage = () => {
  const { user, accessToken } = useContext(AppContext);
  const { setMessages, addMessage } = useContext(MessageContext);
  const { chatId, name, recvId } = useCustomParams();
  const { connection } = useContext(ConnectionContext);
  const { chatRooms, setChatRooms, addChatRoom } = useContext(ChatRoomContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, control } = useForm();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.invoke("GetDialogs", user._Id);
          connection.on("onGetDialogs", (dialogs) => {
            console.log(dialogs);
            setChatRooms(dialogs);
          });
          connection.on("onReceiveError", (error) => {
            console.log("Error: ", error);
          });
          connection.on("onCreateDialog", (chatroom) => {
            chatroom.name =
              chatroom.participants[0]._Id === user._Id
                ? chatroom.participants[1].name
                : chatroom.participants[0].name;
            addChatRoom(chatroom);
          });

          connection.on("onGetMessages", (messages) => {
            setMessages(messages);
          });
          connection.on("onMessage", (message) => {
            addMessage(message);
          });
          console.log(connection);
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);
  const createdChat = async (data) => {
    const { name } = data.data;
    console.log(name);
    try {
      const userEnter = await instance.get(`/User/GetUserByName?name=${name}`);
      console.log(userEnter);
      if (user) {
        connection.invoke("CreateAndEnterDialog", user._Id, userEnter.data._Id);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="chatpage dark:bg-gray-900">
      <div className=" shadow-lg rounded-lg ">
        <div className="px-5 py-5 flex justify-between text-white items-center dark:bg-[#1B1C28] bg-white dark:border-[#593A8D] border-b-2">
          <div className="font-semibold text-2xl">TRPO-chat</div>

          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-row justify-between dark:bg-gray-900 bg-white h-chatHeight">
          <div className="flex flex-col w-2/5 border-r-2 dark:bg-[#1B1C28] dark:text-white dark:border-[#593A8D] relative">
            <button
              onClick={openModal}
              className="text-center text-xl p-2 border-b-2 dark:border-[#593A8D]"
            >
              <h3> + Создать чат</h3>
            </button>
            <div className="border-b-2 py-4 px-2  dark:border-[#593A8D] sticky">
              <input
                type="text"
                placeholder="search chatting"
                className="py-2 px-2 border-2 dark:text-white dark:bg-gray-900 border-[#593A8D] rounded-2xl w-full"
              />
            </div>
            <ChatRooms chatrooms={chatRooms} />
          </div>
          {name && chatId && recvId ? (
            <Messages name={name} chatId={chatId} recvId={recvId} />
          ) : (
            <div className=" flex-1 flex justify-center items-center dark:text-white">
              <h1>Выберите чат</h1>
            </div>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h1>Создание диалога</h1>
          <Form control={control} onSubmit={createdChat}>
            <input
              type="text"
              {...register("name")}
              placeholder="Введите имя пользователя"
            />
            <button>Отправить</button>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
