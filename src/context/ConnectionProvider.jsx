import { useEffect, useState } from "react";
import ConnectionContext from "./ConnectionContext";
import * as signalR from "@microsoft/signalr";

const ConnectionContextProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5211/chat", {
        accessTokenFactory: () => {
          return JSON.parse(localStorage.getItem("accessToken"));
        },
      })
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  const connectionValue = {
    connection,
  };
  return (
    <ConnectionContext.Provider value={connectionValue}>
      {children}
    </ConnectionContext.Provider>
  );
};
export default ConnectionContextProvider;
