import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userToken");
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location, message: "Debes loguearte para acceder a la aplicación." }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
