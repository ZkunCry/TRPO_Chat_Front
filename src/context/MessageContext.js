import { createContext } from "react";

const MessageContext = createContext({
  setMessages: () => {},
  addMessage: () => {},
  setLoading: () => {},
  messages: null,
  isLoading: null,
});
export default MessageContext;
