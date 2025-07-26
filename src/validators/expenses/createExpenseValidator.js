import * as Yup from 'yup';

export const createExpenseSchema = Yup.object().shape({
  expenses: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('El tipo es obligatorio'),
      value: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser mayor que 0')
        .required('El valor es obligatorio'),
      description: Yup.string().required('La descripción es obligatoria'),
    })
  ),
});