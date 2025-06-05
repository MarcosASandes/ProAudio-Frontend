import * as Yup from 'yup';

export const tagSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Mínimo 2 caracteres'),
  description: Yup.string()
    .required('La descripción es obligatoria')
    .min(5, 'Mínimo 5 caracteres'),
    father_id: Yup.number()
    .required('Ha habido un problema seleccionado la etiqueta base')
    .nullable(),
});
