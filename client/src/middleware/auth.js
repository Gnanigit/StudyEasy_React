import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const email = useAuthStore.getState().auth.email;
  if (!email && !token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
