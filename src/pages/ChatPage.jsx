import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import * as signalR from "@microsoft/signalr";
import ChatItem from "../components/ChatItem";
import { instance } from "../utils/axios";
import Modal from "../components/Modal";
import { Form, useForm } from "react-hook-form";

export const ChatPage = () => {
  const [connection, setConnection] = useState(null);
  const { user, accessToken } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {register,control} = useForm();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(connection);
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5211/chat", {
        accessTokenFactory: () => {
          return accessToken;
        },
      })
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
        })
        .catch((e) => console.log("Connection failed: ", e));

      connection.on("onMessage", (message) => {
        console.log("Received message: ", message);
        // Обработка полученного сообщения
      });
    }
  }, [connection]);

  const createdChat = async (data) => {
    const {name} = data.data;
    console.log(name);
    try {
      const user = await instance.get(`/User/GetUserByName?name=${name}`)
      
      console.log(user);
    } catch (error) {
      console.log("Error: ",error);
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
            <div className="flex flex-col w-full  overflow-y-auto">
              <ChatItem />
            </div>
          </div>

          <div className="w-full px-5 flex flex-col justify-between min-h-chatHeight">
            <div className="flex flex-col mt-5">
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 dark:bg-[#593A8D] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone !
                </div>
              </div>
              <div className="flex justify-start mb-4">
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat at praesentium, aut ullam delectus odio error sit rem.
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
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h1>Создание диалога</h1>
          <Form control={control} onSubmit={createdChat}>
          <input type="text" {...register("name")} placeholder="Введите имя пользователя" />
          <button  >Отправить</button>

          </Form>
        </Modal>
      </div>
    </div>
  );
};
