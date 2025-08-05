import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { clearLoggedUser } from "../../features/auth/AuthSlice";
import { logout } from "../../services/authApiService";

const useLogout = () => {
  const dispatch = useDispatch();

  const logoutUser = useCallback(
    async (token) => {
      try {
        const response = await logout(token);
        dispatch(clearLoggedUser(response));
        showToast("Sesión cerrada correctamente");
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
      }
    },
    [dispatch]
  );

  return { logoutUser };
};

export default useLogout;
