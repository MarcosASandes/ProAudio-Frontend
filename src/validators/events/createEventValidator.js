import * as yup from "yup";

const createEventValidator = yup.object().shape({
  name: yup.string().max(50, "El nombre no puede tener más de 50 caracteres").required("El nombre es obligatorio"),
  address: yup.string().max(100, "La dirección no puede tener más de 100 caracteres").required("La dirección es obligatoria"),
  distance: yup
    .number()
    .typeError("La distancia debe ser un número")
    .positive("Debe ser un número positivo")
    .required("La distancia es obligatoria"),
  description: yup.string().max(150, "La descripción no puede tener más de 150 caracteres").required("La descripción es obligatoria"),
});

export default createEventValidator;
