import * as yup from "yup";

export const createProductInProjectValidator = yup.object().shape({
  products: yup.array().of(
    yup.object().shape({
      product_id: yup.number().required("El producto es obligatorio"),
      price_id: yup.number().required("El precio es obligatorio"),
      amount: yup
        .number()
        .typeError("Debe ser un número")
        .positive("Debe ser mayor a cero")
        .required("La cantidad es obligatoria"),
    })
  ),
});
