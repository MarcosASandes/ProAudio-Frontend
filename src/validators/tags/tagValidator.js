import * as Yup from 'yup';

export const tagSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(1, 'Mínimo 1 caracter')
    .max(50, 'Máximo 50 caracteres'),
  description: Yup.string()
    .required('La descripción es obligatoria')
    .min(5, 'Mínimo 5 caracteres')
    .max(150, 'Máximo 150 caracteres'),
    father_id: Yup.number()
    .required('Ha habido un problema seleccionado la etiqueta base')
    .nullable(),
});
