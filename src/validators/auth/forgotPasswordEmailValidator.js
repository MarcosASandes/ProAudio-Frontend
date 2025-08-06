import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debes ingresar un correo válido")
    .required("El correo es obligatorio"),
});
