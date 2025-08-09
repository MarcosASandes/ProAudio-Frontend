import * as yup from "yup";

export const updateClientValidator = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  phone_number: yup
    .string()
    .nullable()
    .matches(/^[0-9+\-\s()]*$/, "Formato de teléfono inválido")
    .max(20, "Máximo 20 caracteres"),
  email: yup
    .string()
    .nullable()
    .email("Correo electrónico inválido")
    .max(100, "Máximo 100 caracteres"),
  address: yup
    .string()
    .nullable()
    .max(255, "Máximo 255 caracteres"),
  details: yup
    .string()
    .nullable()
    .max(500, "Máximo 500 caracteres"),
});
