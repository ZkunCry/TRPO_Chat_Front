import "./App.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import { Route, Routes } from "react-router-dom";
import { Authorize } from "./components/Authorize";

function App() {
  return (
    <Routes>
      {["/", "signin", "signup"].map((path, index) => {
        return <Route key={index} path={path} element={<Authorize />}></Route>;
      })}
    </Routes>
  );
}

export default App;
