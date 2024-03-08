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
  <React.StrictMode>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
