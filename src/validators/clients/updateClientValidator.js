import * as yup from "yup";

export const updateClientValidator = yup.object().shape({
  /*name: yup
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
    .max(500, "Máximo 500 caracteres"),*/
  name: yup
    .string()
    .max(20, "El nombre debe tener como máximo 20 caracteres")
    .required("Este campo es obligatorio."),
  phone: yup
    .string()
    .max(12, "La longitud de caracteres del teléfono debe ser 12")
    .required("El teléfono es obligatorio.")
    .matches(/^[0-9+()\-\s]*$/, "Formato de teléfono inválido."),
  email: yup
    .string()
    .max(50, "El email debe tener una longitud menor o igual a 50 caracteres")
    .required("El correo es obligatorio.")
    .email("Debe ser un correo válido."),
  address: yup
    .string()
    .max(100, "La dirección no puede tener más de 100 caracteres")
    .required("La dirección es obligatoria."),
  details: yup
    .string()
    .max(150, "El detalle no puede tener más de 150 caracteres")
    .notRequired(),
});
