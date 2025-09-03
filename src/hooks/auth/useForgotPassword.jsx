import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { forgotPassword } from "../../services/authApiService";

const useForgotPassword = () => {
  const dispatch = useDispatch();

  const userForgotPassword = useCallback(
    async (email) => {
      try {
        const response = await forgotPassword(email);
        showToast(response?.data?.message);
        return response;
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return null;
      }
    },
    [dispatch]
  );

  return { userForgotPassword };
};

export default useForgotPassword;
