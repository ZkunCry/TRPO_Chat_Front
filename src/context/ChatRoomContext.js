import { createContext } from "react";

const ChatRoomContext = createContext({
  setChatRooms: () => {},
  addChatRoom: () => {},
  chatRooms: null,
});
export default ChatRoomContext;
