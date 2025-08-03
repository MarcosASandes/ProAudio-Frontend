export const getCreateProjectFormErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);
  if (errors.products?.message) messages.push(errors.products.message);
  if (errors.expenses?.message) messages.push(errors.expenses.message);

  return messages;
};

export const getUpdateProjectFormErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);
  if (errors.payment_status) messages.push(errors.payment_status.message);
  if (errors.status) messages.push(errors.status.message);

  return messages;
};