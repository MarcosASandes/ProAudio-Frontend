import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { login } from "../../services/authApiService";
import { setLoggedUser } from "../../features/auth/AuthSlice";

const useLogin = () => {
  const dispatch = useDispatch();

  const loginUser = useCallback(
    async (mail, password) => {
      try {
        const response = await login(mail, password);
        dispatch(setLoggedUser(response));
        showToast("Logueado correctamente");
        return response;
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return null;
      }
    },
    [dispatch]
  );

  return { loginUser };
};

export default useLogin;
