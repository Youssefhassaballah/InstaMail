import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import UserService from "../services/UserService";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const { setusername, setuserEmail, setphoneNumber, setToken } =
    useAppContext();
  console.log(token);

  if (token == null) {
    return <Navigate to="/login" />;
  } else {
    UserService.getUserFromToken(
      token,
      setToken,
      setusername,
      setuserEmail,
      setphoneNumber
    );
    return children;
  }
};

export default ProtectedRoute;
