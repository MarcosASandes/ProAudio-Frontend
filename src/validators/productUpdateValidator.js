import * as Yup from 'yup';

export const productUpdateSchema = Yup.object().shape({
  model: Yup.string()
    .max(50, 'Máximo 50 caracteres')
    .required('El modelo es obligatorio'),

  comments: Yup.string()
    .max(150, 'Máximo 150 caracteres')
    .required('Los comentarios son obligatorios'),

  replacement_value: Yup.number()
    .typeError('Debe ser un número válido')
    .min(0, 'Debe ser mayor o igual a 0')
    .max(99999999.99, 'Máximo valor permitido: 99999999.99')
    .test(
      'max-decimals',
      'Máximo dos decimales',
      value => /^\d+(\.\d{1,2})?$/.test(value?.toString() || '')
    )
    .required('El valor de reposición es obligatorio'),

  status: Yup.string().oneOf(['UNUSED', 'ACTIVE', 'ELIMINATED']).required(),
});
