import * as yup from "yup";

const createProjectValidator = yup.object().shape({
  name: yup.string().required("El nombre del proyecto es obligatorio"),
  description: yup
    .string()
    .required("La descripción del proyecto es obligatoria"),
  start_date: yup
    .string()
    .required("La fecha de inicio es obligatoria"),
  end_date: yup
    .string()
    .required("La fecha de finalización es obligatoria"),
  status: yup
    .string()
    .oneOf(["PLANNED", "IN_PROGRESS", "FINISHED"])
    .required("El estado del proyecto es obligatorio"),
  payment_status: yup
    .string()
    .oneOf(["NO_BILL", "PAID", "PENDING"])
    .required("El estado de pago es obligatorio"),
  project_type: yup
    .string()
    .oneOf(["service", "rental"])
    .required("El tipo de proyecto es obligatorio"),
  cost_addition: yup
    .number()
    .typeError("La adición de costo debe ser un número")
    .min(0, "La adición de costo no puede ser negativa")
    .required("La adición de costo es obligatoria"),
  products: yup.array().of(
    yup.object().shape({
      product_id: yup
        .number()
        .typeError("El ID del producto debe ser un número")
        .required("El ID del producto es obligatorio"),
      amount: yup
        .number()
        .typeError("La cantidad debe ser un número")
        .min(1, "La cantidad debe ser al menos 1")
        .required("La cantidad es obligatoria"),
    })
  ),
  expenses: yup.array().of(
    yup.object().shape({
      type: yup
        .string()
        .oneOf(["PERSONNEL", "EQUIPMENT", "TRANSPORT"])
        .required("El tipo de gasto es obligatorio"),
      value: yup
        .number()
        .typeError("El valor del gasto debe ser un número")
        .min(0, "El valor del gasto no puede ser negativo")
        .required("El valor del gasto es obligatorio"),
      description: yup
        .string()
        .required("La descripción del gasto es obligatoria"),
    })
  ),
});

export default createProjectValidator;
