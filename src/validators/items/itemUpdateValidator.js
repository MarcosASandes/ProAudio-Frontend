import * as yup from "yup";

const updateItemSchema = yup.object().shape({
  description: yup.string().required("La descripción es obligatoria"),
  status: yup.string().required("Debes seleccionar un estado"),
});

export default updateItemSchema;
