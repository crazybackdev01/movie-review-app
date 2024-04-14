import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
