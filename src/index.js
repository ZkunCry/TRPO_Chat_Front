import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContextProvider";
import ChatRoomContextProvider from "./context/ChatRoomContextProvider";
import MessageContextProvider from "./context/MessageContextProdiver";
import ConnectionContextProvider from "./context/ConnectionProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppContextProvider>
      <MessageContextProvider>
        <ChatRoomContextProvider>
          <ConnectionContextProvider>
            <App />
          </ConnectionContextProvider>
        </ChatRoomContextProvider>
      </MessageContextProvider>
    </AppContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
