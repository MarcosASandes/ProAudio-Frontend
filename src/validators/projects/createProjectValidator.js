import * as yup from "yup";
import createClientValidator from "../clients/createClientValidator";

const createProjectValidator = yup.object().shape({
  name: yup
    .string()
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre del proyecto es obligatorio"),

  description: yup
    .string()
    .max(150, "La descripción no puede tener más de 150 caracteres")
    .notRequired(),

  start_date: yup.string().required("La fecha de inicio es obligatoria"),
  end_date: yup.string().required("La fecha de finalización es obligatoria"),

  project_type: yup
    .string()
    .oneOf(
      ["SERVICE", "RENT"],
      "No se ha seleccionado un tipo de proyecto válido."
    )
    .required("El tipo de proyecto es obligatorio"),

  status: yup
    .string()
    .oneOf(
      [
        "PLANNED",
        "CONFIRMED",
        "DISCARDED",
        "ON_COURSE",
        "EXPIRED",
        "COMPLETED",
      ],
      "No se ha seleccionado un estado de proyecto válido."
    )
    .required("El estado de proyecto es obligatorio"),

  cost_addition: yup
    .number()
    .typeError("La adición de costo debe ser un número")
    .min(0, "La adición de costo no puede ser negativa")
    .required("La adición de costo es obligatoria"),

  // --- EVENTO ---
  event_id: yup.number().nullable(),
  event: yup
    .object()
    .shape({
      name: yup
        .string()
        .max(150, "El nombre del evento no puede tener más de 150 caracteres")
        .required("El nombre del evento es obligatorio"),
      address: yup
        .string()
        .max(
          100,
          "La dirección del evento no puede tener más de 100 caracteres"
        )
        .required("La dirección del evento es obligatoria"),
      distance: yup
        .number()
        .typeError("La distancia debe ser un número")
        .min(0, "La distancia no puede ser negativa")
        .required("La distancia del evento es obligatoria"),
      description: yup
        .string()
        .max(150, "La descripción no puede tener más de 150 caracteres")
        .notRequired(),
    })
    .nullable()
    .test(
      "event-or-event_id",
      "Debes seleccionar o crear un evento",
      function (value) {
        const { event_id } = this.parent;
        return !!event_id || !!value;
      }
    ),

  client: yup
    .object()
    .nullable()
    .test(
      "client-required",
      "Debes seleccionar o crear un cliente",
      function (value) {
        console.log("Valor en test de Yup:", value);
        if (!value) return false;
        if (value.client_id) return true;
        return createClientValidator.isValidSync(value);
      }
    ),

  // --- PRODUCTOS ---
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

  // --- GASTOS ---
  expenses: yup.array().of(
    yup.object().shape({
      type: yup
        .string()
        .oneOf(
          ["PERSONNEL", "EXTRA_COST"],
          "No se ha seleccionado un tipo de gasto válido."
        )
        .required("El tipo de gasto es obligatorio"),
      value: yup
        .number()
        .typeError("El valor del gasto debe ser un número")
        .min(0, "El valor del gasto no puede ser negativo")
        .required("El valor del gasto es obligatorio"),
      description: yup
        .string()
        .max(
          150,
          "La descripción del gasto no puede tener más de 150 caracteres"
        )
        .notRequired(),
    })
  ),
});

export default createProjectValidator;
