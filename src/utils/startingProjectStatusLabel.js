export const getStatusLabel = (status) => {
  switch (status) {
    case "PLANNED":
      return "Planificado";
    case "CONFIRMED":
      return "Confirmado";
    case "ON_COURSE":
      return "En curso";
    case "COMPLETED":
      return "Completado";
    case "EXPIRED":
      return "Expirado";
    case "DISCARDED":
      return "Descartado";
    case "BUDGETED":
      return "Presupuestado";
    case "BILL_CREATED":
      return "Factura creada";
    case "PARTIALLY_PAID":
      return "Parcialmente pagado";
    case "PAID":
      return "Pagado";
    default:
      return status;
  }
};

export const getItemsStatusLabel = (status) => {
  switch (status) {
    case "CREATED":
      return "Creado";
    case "DELETED":
      return "Eliminado";
    case "GOOD":
      return "Buen estado";
    case "WITH_DETAILS":
      return "Con detalles";
    case "OUT_OF_USAGE":
      return "Fuera de uso";
    default:
      return status;
  }
};

export const getItemsLocationLabel = (status) => {
  switch (status) {
    case "IN_DEPOSIT":
      return "En el depósito";
    case "USING":
      return "En uso";
    case "NOT_RETURNED":
      return "No retornado";
    default:
      return status;
  }
};


export const getRunningStatusLabel = (status) => {
  switch (status) {
    case "RUNNING":
      return "En curso";
    case "PREPARING":
      return "En preparación";
    case "NONE":
      return "Pendiente";
    default:
      return status;
  }
};


export const getExpensesTypesLabel = (status) => {
  switch (status) {
    case "PERSONNEL":
      return "Personal";
    case "EXTRA_COST":
      return "Otros";
    default:
      return status;
  }
};


