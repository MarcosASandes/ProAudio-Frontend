import * as yup from "yup";

export const rentPriceValidator = yup.object().shape({
  value: yup
    .number()
    .typeError("El valor debe ser un número")
    .min(0, "El valor no puede ser negativo")
    .required("El valor es obligatorio"),
  description: yup
    .string()
    .trim()
    .required("La descripción es obligatoria"),
});