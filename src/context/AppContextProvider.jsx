import React, { useState } from "react";
import AppContext from "./AppContext";
const AppContextProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccesstoken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || null
  );
  const setUser = (user) => {
    const currentUser = user;
    console.log(currentUser);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: currentUser.name,
        _Id: currentUser._Id,
      })
    );
    localStorage.setItem(
      "accessToken",
      JSON.stringify(currentUser.accessToken)
    );
    setCurrentUser(user);
    setAccesstoken(currentUser.accessToken);
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
    accessToken,
  };
  return (
    <AppContext.Provider value={valueAppProvider}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
