import * as yup from "yup";

const updateItemSchema = yup.object().shape({
  description: yup.string().required("La descripción del artículo es obligatoria"),
  status: yup.string().notRequired(),
});

export default updateItemSchema;
