import * as yup from "yup";

const createItemsSchema = yup.object().shape({
  description: yup.string().required("La descripción es obligatoria"),
  purchase_price: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser positivo")
    .required("El precio de compra es obligatorio"),
  purchase_date: yup
    .date()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .required("La fecha de compra es obligatoria"),
  quantity: yup
    .number()
    .typeError("Debe ser un número")
    .integer("Debe ser entero")
    .positive("Debe ser positivo")
    .required("La cantidad es obligatoria"),
});

export const createItemsSchemaArray = yup.object().shape({
  items: yup
    .array()
    .of(createItemsSchema)
    .min(1, "Debe agregar al menos un lote de artículos"),
});