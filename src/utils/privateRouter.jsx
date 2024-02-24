import React from 'react'
import { useContext } from 'react';
import AppContext from "../context/AppContext";
import { Outlet,Navigate,useLocation } from 'react-router-dom';

const PrivateRouter = () => {
   const location = useLocation();
   const {accessToken} = useContext(AppContext)

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location.pathname }} replace />
  );
}
export default PrivateRouter;