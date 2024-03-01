import { createContext } from "react";

const MessageContext = createContext({
  setMessages: () => {},
  addMessage: () => {},
  messages: null,
});
export default MessageContext;
