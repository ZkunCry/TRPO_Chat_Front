import { createContext } from "react";

const ChatRoomContext = createContext({
  setChatRooms: () => {},
  addChatRoom: () => {},
  setLastMsg: () => {},
  chatRooms: null,
  lastMessage: null,
});
export default ChatRoomContext;
