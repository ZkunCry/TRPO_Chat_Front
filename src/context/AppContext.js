import { createContext } from "react";

const AppContext = createContext({
  setUser: () => {},
  setAccessToken: () => {},
  getUser: () => {},
  user: null,
});
export default AppContext;
