import * as yup from "yup";

const createClientValidator = yup.object().shape({
  name: yup.string().required("Este campo es obligatorio."),
  phone: yup
    .string()
    .required("El teléfono es obligatorio.")
    .matches(/^[0-9+()\-\s]*$/, "Formato de teléfono inválido."),
  email: yup
    .string()
    .required("El correo es obligatorio.")
    .email("Debe ser un correo válido."),
  address: yup.string().required("La dirección es obligatoria."),
  details: yup.string().notRequired(),
});

export default createClientValidator;
