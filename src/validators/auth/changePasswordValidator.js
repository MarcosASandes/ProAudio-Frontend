import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("La contraseña actual es obligatoria"),
    //.min(8, "Debe tener al menos 8 caracteres")
    //.matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    //.matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    //.matches(/[0-9]/, "Debe contener al menos un número"),

  password: yup
    .string()
    .required("La nueva contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[0-9]/, "Debe contener al menos un número"),

  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debes confirmar tu nueva contraseña"),
});
