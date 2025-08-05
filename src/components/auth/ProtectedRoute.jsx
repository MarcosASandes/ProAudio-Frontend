import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userToken");

  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;