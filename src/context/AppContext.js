import { createContext } from "react";

const AppContext = createContext({
  setUser: () => {},
  setAccessToken: () => {},
  getUser: () => {},
  user: null,
  accessToken: null,
});
export default AppContext;
