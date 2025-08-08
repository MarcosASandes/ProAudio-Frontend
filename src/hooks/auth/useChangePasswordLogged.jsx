import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { changePasswordLogged } from "../../services/authApiService";

const useChangePasswordLogged = () => {
  const dispatch = useDispatch();

  const changePassLogged = useCallback(
    async (currentPass, newPass, newPassRepeat) => {
      try {
        const data = {
          current_password: currentPass,
          new_password: newPass,
          new_password_repeat: newPassRepeat
        }
        const response = await changePasswordLogged(data);
        showToast(response?.message);
        return response;
      } catch (error) {
        const msj = error.response?.data?.message || "Ocurrió un error inesperado";
        showToastError(msj);
        return null;
      }
    },
    [dispatch]
  );

  return { changePassLogged };
};

export default useChangePasswordLogged;
