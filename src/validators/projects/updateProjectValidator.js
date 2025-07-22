import * as yup from "yup";

const updateProjectValidator = yup.object().shape({
  name: yup
    .string()
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre del proyecto es obligatorio"),

  description: yup
    .string()
    .max(150, "La descripción no puede tener más de 150 caracteres")
    .required("La descripción del proyecto es obligatoria"),

  start_date: yup
    .string()
    .required("La fecha de inicio es obligatoria"),

  end_date: yup
    .string()
    .required("La fecha de finalización es obligatoria"),

  project_type: yup
    .string()
    .oneOf(["SERVICE", "RENT"], "Tipo de proyecto inválido")
    .required("El tipo de proyecto es obligatorio"),

  cost_addition: yup
    .number()
    .typeError("La adición de costo debe ser un número")
    .min(0, "La adición de costo no puede ser negativa")
    .required("La adición de costo es obligatoria"),

  status: yup
    .string()
    .oneOf(["PLANNED", "CONFIRMED", "DISCARDED", "CON_COURSE", "EXPIRED", "COMPLETED"], "Estado inválido")
    .required("El estado del proyecto es obligatorio"),

  payment_status: yup
    .string()
    .oneOf(["NO_BILL", "BILLED", "PAID", "BUDGETED", "PAGADO"], "Estado de pago inválido")
    .required("El estado de pago es obligatorio"),

  event_id: yup
    .number()
    .nullable(), // Puede ser null si se pasa un objeto event

  event: yup
    .object()
    .nullable()
    .shape({
      name: yup.string().required("El nombre del evento es obligatorio"),
      address: yup.string().required("La dirección del evento es obligatoria"),
      distance: yup
        .number()
        .typeError("La distancia debe ser un número")
        .min(0, "La distancia no puede ser negativa")
        .required("La distancia del evento es obligatoria"),
      description: yup
        .string()
        .max(150, "La descripción no puede tener más de 150 caracteres")
        .required("La descripción del evento es obligatoria"),
    }),
});

export default updateProjectValidator;
