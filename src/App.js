import "./App.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { Route, Routes } from "react-router-dom";
import { Authorize } from "./components/Authorize";
import { ChatPage } from "./pages/ChatPage";
import PublicRouter from "./utils/publicRouter";
import PrivateRouter from "./utils/privateRouter";

function App() {
  console.log(process.env.NODE_ENV);
  return (
    <Routes>
      <Route element={<PublicRouter />}>
        {["/", "signin", "signup"].map((path, index) => {
          return (
            <Route key={index} path={path} element={<Authorize />}></Route>
          );
        })}
      </Route>
      <Route element={<PrivateRouter />}>
        <Route path="/chatmainpage" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
