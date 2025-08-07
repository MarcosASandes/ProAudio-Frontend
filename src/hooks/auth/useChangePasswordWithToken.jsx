import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, showToastError } from "../../utils/toastUtils";
import { changePasswordWithToken } from "../../services/authApiService";

const useChangePasswordWithToken = () => {
  const dispatch = useDispatch();

  const changePass = useCallback(
    async (tok, pass, passRepeat) => {
      try {
        const data = {
          token: tok,
          new_password: pass,
          new_password_repeat: passRepeat
        }
        const response = await changePasswordWithToken(data);
        console.log("Este es el status: ", response.status);
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

  return { changePass };
};

export default useChangePasswordWithToken;
