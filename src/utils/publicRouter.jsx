import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { Outlet, Navigate } from "react-router-dom";

const PublicRouter = () => {
  const location = useLocation();
  const { accessToken } = useContext(AppContext);
  const from = location?.state?.from || "/";
  console.log(accessToken);
  return !accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/chatmainpage"} state={location.pathname} />
  );
};
export default PublicRouter;
