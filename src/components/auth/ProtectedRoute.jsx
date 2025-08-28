/*import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userToken");

  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;*/


/*-------------------------------- */

/*import { Navigate } from "react-router-dom";
import { showToastError } from "../../utils/toastUtils";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userToken");

  if (!isLoggedIn) {
    showToastError("Debes loguearte para acceder a la aplicación.");
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;*/


/*-------------------------------------- */


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
