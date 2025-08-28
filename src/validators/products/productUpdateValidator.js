import * as Yup from 'yup';

export const productUpdateSchema = Yup.object().shape({
  model: Yup.string()
    .max(50, 'El modelo debe tener como máximo 50 caracteres')
    .required('El modelo es obligatorio'),

  comments: Yup.string()
    .max(150, 'Los comentarios deben tener como máximo 150 caracteres')
    .notRequired(),

  replacement_value: Yup.number()
    .typeError('El valor de reposición debe ser un número válido')
    .min(0, 'El valor de reposición debe ser mayor o igual a 0')
    .max(99999999.99, 'Máximo valor permitido: 99999999.99')
    .test(
      'max-decimals',
      'Máximo dos decimales',
      value => /^\d+(\.\d{1,2})?$/.test(value?.toString() || '')
    )
    .required('El valor de reposición es obligatorio'),
});
