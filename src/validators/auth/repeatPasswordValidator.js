import * as yup from "yup";

export const repeatPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("La nueva contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debes confirmar tu nueva contraseña"),
});
