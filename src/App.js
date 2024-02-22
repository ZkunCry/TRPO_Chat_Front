import "./App.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { Route, Routes } from "react-router-dom";
import { Authorize } from "./components/Authorize";
import { ChatPage } from "./pages/ChatPage";

function App() {
  return (
    <Routes>
      {["/", "signin", "signup"].map((path, index) => {
        return <Route key={index} path={path} element={<Authorize />}></Route>;
      })}
      <Route path="/chatmainpage" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
