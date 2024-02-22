import React, { useState } from "react";
import AppContext from "./AppContext";
const AppContextProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };
  const getUser = () => {
    return user;
  };
  const setAccessToken = () => {};
  const valueAppProvider = {
    setAccessToken,
    setUser,
    getUser,
    user,
  };
  return (
    <AppContext.Provider value={valueAppProvider}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
