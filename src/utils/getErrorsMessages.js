export const getCreateProjectFormErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.project_type) messages.push(errors.project_type.message);
  if (errors.status) messages.push(errors.status.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);

  if (errors.event) {
    if (errors.event.message) messages.push(errors.event.message);

    if (errors.event.name) messages.push(errors.event.name.message);
    if (errors.event.address) messages.push(errors.event.address.message);
    if (errors.event.distance) messages.push(errors.event.distance.message);
    if (errors.event.description)
      messages.push(errors.event.description.message);
  }

  if (errors.client) {
    if (errors.client.message) messages.push(errors.client.message);

    if (errors.client.name) messages.push(errors.client.name.message);
    if (errors.client.phone) messages.push(errors.client.phone.message);
    if (errors.client.email) messages.push(errors.client.email.message);
    if (errors.client.address) messages.push(errors.client.address.message);
    if (errors.client.details) messages.push(errors.client.details.message);
  }

  if (errors.products) {
    errors.products.forEach((prod, index) => {
      if (!prod) return;
      if (prod.product_id)
        messages.push(`Producto ${index + 1}: ${prod.product_id.message}`);
      if (prod.amount)
        messages.push(`Producto ${index + 1}: ${prod.amount.message}`);
    });
  }

  if (errors.expenses) {
    errors.expenses.forEach((exp, index) => {
      if (!exp) return;
      if (exp.type) messages.push(`Gasto ${index + 1}: ${exp.type.message}`);
      if (exp.value) messages.push(`Gasto ${index + 1}: ${exp.value.message}`);
      if (exp.description)
        messages.push(`Gasto ${index + 1}: ${exp.description.message}`);
    });
  }

  return messages;
};


/*export const getUpdateProjectFormErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);
  if (errors.payment_status) messages.push(errors.payment_status.message);
  if (errors.status) messages.push(errors.status.message);

  return messages;
};*/

export const getUpdateProjectFormErrorMessages = (errors) => {
  const messages = [];

  if (errors.name) messages.push(errors.name.message);
  if (errors.description) messages.push(errors.description.message);
  if (errors.start_date) messages.push(errors.start_date.message);
  if (errors.end_date) messages.push(errors.end_date.message);
  if (errors.project_type) messages.push(errors.project_type.message);
  if (errors.status) messages.push(errors.status.message);
  if (errors.cost_addition) messages.push(errors.cost_addition.message);

  if (errors.event) {
    if (errors.event.message) messages.push(errors.event.message);
    if (errors.event.name) messages.push(errors.event.name.message);
    if (errors.event.address) messages.push(errors.event.address.message);
    if (errors.event.distance) messages.push(errors.event.distance.message);
    if (errors.event.description)
      messages.push(errors.event.description.message);
  }

  if (errors.client) {
    if (errors.client.message) messages.push(errors.client.message);
    if (errors.client.name) messages.push(errors.client.name.message);
    if (errors.client.phone) messages.push(errors.client.phone.message);
    if (errors.client.email) messages.push(errors.client.email.message);
    if (errors.client.address) messages.push(errors.client.address.message);
    if (errors.client.details) messages.push(errors.client.details.message);
  }

  return messages;
};

export const getCreateProductFormErrorMessages = (errors) => {
  const messages = [];
  if (errors.model) messages.push(errors.model.message);
  if (errors.comments) messages.push(errors.comments.message);
  if (errors.replacement_value) messages.push(errors.replacement_value.message);
  if (errors.photos) messages.push(errors.photos.message);
  if (errors.prices?.message) {
    messages.push(errors.prices.message);
  }
  if (errors.prices && Array.isArray(errors.prices)) {
    errors.prices.forEach((priceError) => {
      if (priceError?.value) messages.push(priceError.value.message);
      if (priceError?.description)
        messages.push(priceError.description.message);
    });
  }
  return messages;
};
